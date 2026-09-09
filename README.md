# Webster Sound & Light

Webová prezentácia firmy Webster Sound & Light, ktorá zabezpečuje techniku pre
podujatia: ozvučenie, osvetlenie, pódiá, hliníkové strechy a LED obrazovky.
Web je určený organizátorom obecných dní, festivalov, plesov, konferencií
a koncertov. Jeho úlohou je ukázať reálne referencie a vlastný park techniky
a priviesť návštevníka k nezáväznej rezervácii termínu alebo ku kontaktu.

## Použité technológie

- Next.js 15 (App Router, Server Components)
- React 19
- TypeScript
- Tailwind CSS v4 (cez `@tailwindcss/postcss`, bez samostatného config súboru)
- Server Actions pre spracovanie formulárov, validácia cez Zod
- Resend pre doručenie odoslaných formulárov na e-mail
- sharp pre lokálne predspracovanie fotografií a generovanie OG kariet

## Štruktúra priečinkov

```
src/app/            routing App Routera, všetky verejné stránky sú
                    pod jazykovým segmentom [lang] (sk, en).
                    Okrem stránok tu je actions.ts (Server Actions
                    formulárov), sitemap.ts, robots.ts a globals.css.
src/components/     komponenty rozhrania. Podpriečinok sections/ obsahuje
                    celé sekcie domovskej stránky, form/ polia formulárov.
src/content/        obsahová vrstva. Texty, referencie, technika, typy
                    podujatí, firemné údaje a manifest fotografií. Tu sa
                    obsah upravuje bez zásahu do komponentov.
src/lib/            pomocné moduly: i18n.ts (jazyky a slovníky) a
                    photos.ts (čítanie manifestu fotografií).
src/middleware.ts   presmerovanie na jazykovú verziu podľa prehliadača.
scripts/            nástroje spúšťané ručne, nie sú súčasťou buildu.
public/photos/      predspracované fotografie vo variantoch AVIF a WebP.
public/og/          vygenerované Open Graph karty.
```

## Lokálne spustenie

```bash
npm install
npm run dev
```

Vývojový server beží na `http://localhost:3000`. Adresa bez jazyka sa
automaticky presmeruje na `/sk`, prípadne na `/en` podľa jazyka prehliadača.

Ďalšie príkazy:

```bash
npm run build      produkčný build
npm start          spustenie produkčného buildu
npm run lint       kontrola pravidiel ESLint
npm run typecheck  kontrola typov bez generovania výstupu
```

Pre lokálny beh formulárov skopírujte `.env.example` do `.env.local`
a doplňte hodnoty. Bez `RESEND_API_KEY` sa formulár zobrazí a zvaliduje,
ale e-mail sa neodošle.

## Nástroje v priečinku scripts

### `npm run images`

Spustí `scripts/process-images.mjs`. Načíta originálne fotografie z externého
priečinka s podkladmi (cesta je v `scripts/photo-map.mjs` ako `SOURCE_ROOT`),
prevedie ich na responzívne varianty AVIF a WebP v niekoľkých šírkach podľa
zaradenia fotografie, odvodí z loga favicony a ikony aplikácie a zapíše
manifest `src/content/photos.generated.json` s rozmermi, zoznamom šírok,
popisom a rozmazaným náhľadom (LQIP) pre plynulé načítanie.

Skript je potrebný len vtedy, keď pribudnú alebo sa vymenia zdrojové
fotografie. Výstupy sú v repozitári, takže bežný vývoj ani build ho nepotrebujú.
Pozor: cesta k podkladom je lokálna, na inom počítači ju treba upraviť.

### `node scripts/make-og.mjs`

Vygeneruje Open Graph karty `public/og/og-sk.png` a `public/og/og-en.png`
v rozmere 1200x630 px. Karta sa skladá lokálne: vezme najväčšiu dostupnú
fotografiu `hero-koncert-*.webp` z `public/photos`, oreže ju, prekryje tmavým
gradientom kvôli čitateľnosti a doplní text vykreslený cez SVG. Skript je
idempotentný, priečinok `public/og` si vytvorí sám a do konzoly vypíše cestu
a veľkosť oboch výstupov.

## Dvojjazyčnosť

Web beží v slovenčine a angličtine. Jazyk je súčasťou adresy
(`/sk/...` a `/en/...`), slovenčina je predvolená. Návštevník bez jazyka
v adrese sa presmeruje middlewarom: angličtina sa ponúkne len vtedy, ak si ju
prehliadač výslovne pýta.

Preklady rozhrania sú v `src/lib/i18n.ts`. Obsahové súbory v `src/content`
majú dvojjazyčné polia v tvare `{ sk, en }`, takže nová referencia alebo
položka techniky sa dopĺňa na jednom mieste pre oba jazyky. Stránky majú
nastavené `alternates.languages`, aby vyhľadávače poznali vzájomné väzby
jazykových verzií.

## Súkromie

Web nepoužíva žiadnu analytiku, meracie kódy ani marketingové cookies.
Nezobrazuje sa preto ani cookie lišta, nie je čo odsúhlasovať. Jediné osobné
údaje, ktoré web spracúva, sú tie, ktoré návštevník sám vyplní v rezervačnom
alebo kontaktnom formulári. Tie sa neukladajú do databázy, iba sa odošlú
e-mailom na firemnú adresu.

## Čo treba doplniť

Nasledujúce údaje neboli v podkladoch. Web ich nikde nevymýšľa: sekcie, ktoré
ich potrebujú, sa jednoducho nezobrazia, kým sa nedoplnia. Po doplnení sa
objavia automaticky vrátane štruktúrovaných dát pre vyhľadávače.

**Firemné údaje, súbor `src/content/site.ts`** (všetky uvedené hodnoty sú
zatiaľ `null`):

- telefónne číslo (`contact.phone` v medzinárodnom tvare a `contact.phoneDisplay`
  v tvare na zobrazenie)
- kontaktný e-mail (`contact.email`)
- adresa: ulica s číslom (`contact.street`) a PSČ s mestom (`contact.city`)
- právna forma a presný obchodný názov podľa registra (`legal.entity`)
- IČO (`legal.ico`), DIČ (`legal.dic`), prípadne IČ DPH (`legal.icDph`)
  a údaj o zápise v registri (`legal.registration`)
- odkazy na oficiálne profily na sociálnych sieťach (`social.facebook`,
  `social.instagram`, `social.youtube`, `social.tiktok`)

Bez identifikačných údajov nie je možné dokončiť právne stránky, preto sa na
nich zobrazuje upozornenie o neúplnosti.

**Recenzie, súbor `src/content/reviews.json`**: pole `items` je prázdne.
Sekcia recenzií sa na webe zobrazí až vtedy, keď v ňom budú aspoň tri reálne
záznamy (hodnota `minimumToDisplay`). Formát záznamu je popísaný priamo
v súbore. Vymyslené recenzie sú neprípustné.

**Fotografie k referenciám, súbor `src/content/references.ts`**: štrnásť
referencií má `photo: null`, teda k nim zatiaľ nie je fotografia v použiteľnom
rozlíšení. Karty sa vykresľujú typograficky. Po dodaní originálov ich stačí
pridať do `scripts/photo-map.mjs`, spustiť `npm run images` a doplniť slug
fotografie k príslušnej referencii.
