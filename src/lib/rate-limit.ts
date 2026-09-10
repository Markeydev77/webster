/**
 * Jednoduché obmedzenie frekvencie pre kontaktný formulár.
 *
 * Beží v pamäti serverovej funkcie. Na Verceli sa stav delí len v rámci jednej
 * teplej inštancie, nie medzi všetkými, takže to nie je nepriestrelná ochrana.
 * Na malý firemný web to ale stačí: zastaví to najčastejší prípad, keď jeden
 * útočník alebo pokazený skript búši na formulár v slučke, a chráni to denný
 * limit e-mailovej služby.
 */

type Hit = { count: number; resetAt: number };

const WINDOW_MS = 10 * 60 * 1000; // 10 minút
const PER_IP_MAX = 4; // koľko odoslaní z jednej IP za okno
const GLOBAL_MAX = 40; // koľko odoslaní spolu za okno (poistka na kvótu e-mailov)

const perIp = new Map<string, Hit>();
let globalHit: Hit = { count: 0, resetAt: Date.now() + WINDOW_MS };

function bump(hit: Hit): Hit {
  const now = Date.now();
  if (now > hit.resetAt) {
    return { count: 1, resetAt: now + WINDOW_MS };
  }
  return { count: hit.count + 1, resetAt: hit.resetAt };
}

export type RateResult = "ok" | "ip-limited" | "global-limited";

export function checkRateLimit(ip: string): RateResult {
  // Priebežné čistenie starých záznamov, aby mapa nerástla donekonečna.
  if (perIp.size > 5000) {
    const now = Date.now();
    for (const [key, hit] of perIp) {
      if (now > hit.resetAt) perIp.delete(key);
    }
  }

  globalHit = bump(globalHit);
  if (globalHit.count > GLOBAL_MAX) {
    return "global-limited";
  }

  const current = perIp.get(ip) ?? { count: 0, resetAt: Date.now() + WINDOW_MS };
  const next = bump(current);
  perIp.set(ip, next);
  if (next.count > PER_IP_MAX) {
    return "ip-limited";
  }

  return "ok";
}
