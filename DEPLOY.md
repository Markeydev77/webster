# Nasadenie webu

Návod na zverejnenie webu Webster Sound & Light. Prvé nasadenie ide cez GitHub
na Vercel, ktorý je pre tento typ projektu najjednoduchší. Neskorší presun na
vlastný hosting je popísaný v kroku 5.

## Krok 1: GitHub repozitár

Na `github.com` vytvorte nový repozitár, napríklad `webster-web`. Nechajte ho
prázdny: bez README, bez `.gitignore`, bez licencie, inak sa prvé nahratie
zbytočne skomplikuje. Repozitár môže byť súkromný, Vercel si s ním poradí.

V priečinku projektu potom spustite:

```bash
git init
git add .
git commit -m "Prvá verzia webu"
git branch -M main
git remote add origin https://github.com/POUZIVATEL/webster-web.git
git push -u origin main
```

Namiesto `POUZIVATEL/webster-web` doplňte adresu svojho repozitára, ktorú
GitHub ukáže hneď po jeho vytvorení.

Súbor `.gitignore` je už pripravený, takže sa nenahrá `node_modules`,
priečinok `.next` ani súbory `.env` s tajnými kľúčmi. To je správne: skutočné
hodnoty premenných prostredia do repozitára nikdy nepatria, do Vercelu sa
zadávajú samostatne v kroku 3.

## Krok 2: Import do Vercelu

1. Prihláste sa na `vercel.com`, ideálne rovnakým GitHub účtom.
2. Kliknite na **Add New** a **Project**.
3. V zozname **Import Git Repository** vyberte repozitár z kroku 1. Ak sa
   v zozname neobjaví, cez **Adjust GitHub App Permissions** povoľte Vercelu
   prístup k nemu.
4. Vercel sám rozpozná, že ide o Next.js. Framework Preset ostane **Next.js**,
   Build Command, Output Directory aj Install Command nechajte predvolené,
   nič sa neprepisuje.
5. Ešte pred prvým buildom rozbaľte **Environment Variables** a doplňte
   premenné podľa kroku 3. Bez nich sa web nasadí, ale formuláre nebudú
   odosielať e-maily.
6. Kliknite na **Deploy**.

Po nasadení dostane web dočasnú adresu v tvare `nazov-projektu.vercel.app`.
Každý ďalší `git push` do vetvy `main` spustí nové nasadenie automaticky.

## Krok 3: Premenné prostredia

Vo Verceli sa nastavujú v **Settings** a **Environment Variables**. Každú
premennú zapnite pre všetky tri prostredia (Production, Preview, Development).
Zoznam zodpovedá súboru `.env.example` v repozitári.

### `RESEND_API_KEY`

API kľúč služby Resend, cez ktorú odchádzajú vyplnené formuláre. Získate ho na
`resend.com` po registrácii v sekcii **API Keys**, tlačidlom **Create API Key**.
Bezplatný program na tento web postačuje. Kľúč sa zobrazí iba raz, uložte si ho.
Ak premenná chýba, formulár sa zvaliduje, ale správa sa nedoručí.

### `CONTACT_INBOX`

E-mailová adresa, na ktorú majú chodiť rezervácie a kontaktné správy. Je to
bežná firemná schránka, ktorú niekto naozaj číta. Nemusí byť na vlastnej doméne.

### `CONTACT_FROM`

Adresa, z ktorej sa správy odosielajú, napríklad `web@vasadomena.sk`. Musí ísť
o adresu na doméne overenej v Resend, inak služba odoslanie odmietne.

**Overenie domény v Resend je nutné.** V Resend otvorte **Domains**, pridajte
svoju doménu a do DNS záznamov domény doplňte hodnoty, ktoré Resend zobrazí
(záznamy typu TXT a MX pre SPF a DKIM). Kým doména nie je v stave **Verified**,
e-maily sa nedoručia. Rozšírenie DNS záznamov trvá spravidla desiatky minút.
Adresa v `CONTACT_FROM` musí patriť tejto overenej doméne, ľubovoľná iná
adresa nebude fungovať.

### `NEXT_PUBLIC_SITE_URL`

Verejná adresa webu aj s `https://`, napríklad `https://www.webstersound.sk`.
Používa sa v canonical URL, v sitemape a v Open Graph značkách pri zdieľaní na
sociálnych sieťach. Dočasne sem môžete dať adresu `.vercel.app`, po pripojení
vlastnej domény ju však treba prepísať, inak bude web vyhľadávačom hlásiť
nesprávnu adresu.

Po zmene ktorejkoľvek premennej treba projekt nasadiť znova: v záložke
**Deployments** pri poslednom nasadení zvoľte **Redeploy**. Samotná zmena
premennej sa na bežiaci web neprejaví.

## Krok 4: Vlastná doména

1. Vo Verceli otvorte projekt, **Settings** a **Domains**.
2. Zadajte doménu, napríklad `webstersound.sk`, a potvrďte **Add**.
3. Vercel zobrazí, aké DNS záznamy nastaviť u registrátora domény:
   - pre koreňovú doménu záznam **A** na IP adresu, ktorú Vercel uvedie
   - pre `www` záznam **CNAME** na `cname.vercel-dns.com`
   Presné hodnoty vždy berte z obrazovky Vercelu, nie z tohto návodu.
4. Záznamy nastavte v administrácii u registrátora domény a počkajte, kým sa
   rozšíria. Zvyčajne to trvá od niekoľkých minút po niekoľko hodín.
5. Vo Verceli zvoľte, ktorý tvar je hlavný (odporúčame `www` a presmerovanie
   z koreňovej domény, alebo naopak, dôležité je držať sa jedného tvaru).
   HTTPS certifikát vystaví Vercel automaticky.
6. **Nezabudnite** prepísať `NEXT_PUBLIC_SITE_URL` na novú adresu a projekt
   nasadiť znova. Doména bez tejto zmeny funguje, ale sitemap, canonical
   adresy a náhľady pri zdieľaní budú stále ukazovať na starú adresu.

## Krok 5: Presun na vlastný hosting

Projekt je štandardná aplikácia Next.js bez akejkoľvek väzby na Vercel
v samotnom kóde. Nepoužíva žiadne funkcie viazané na jedného poskytovateľa,
takže presun je záležitosťou prostredia, nie prepisovania webu.

Na akomkoľvek hostingu s Node.js (verzia 20 alebo novšia) stačí:

```bash
npm ci
npm run build
npm start
```

Aplikácia počúva na porte `3000`, prípadne na porte z premennej `PORT`. Pred
ňu sa postaví Nginx alebo iný reverzný proxy server, ktorý zabezpečí HTTPS
a smerovanie z domény. Proces udržiavajte v behu cez systemd alebo pm2.

Rovnako dobre funguje beh v Dockeri: obraz postavený na `node:20-alpine`
s vyššie uvedeným postupom a spusteným `npm start`. Next.js podporuje aj režim
`output: "standalone"`, ktorý výsledný obraz výrazne zmenší.

Na novom hostingu nezabudnite nastaviť rovnaké premenné prostredia ako vo
Verceli a v DNS prepnúť doménu na novú IP adresu.

## Kontrola pred spustením naživo

- **Firemné údaje sú doplnené.** V `src/content/site.ts` už nie je `null` pri
  telefóne, e-maile, adrese, právnej forme, IČO a DIČ. Zoznam chýbajúcich
  položiek je v `README.md` v sekcii "Čo treba doplniť". Bez nich sa časť
  webu vôbec nezobrazí a právne stránky ostávajú neúplné.
- **Formuláre naozaj odosielajú.** Otestujte oboje: rezervačný formulár aj
  kontaktný formulár. Odošlite skúšobnú správu a overte, že prišla do schránky
  v `CONTACT_INBOX`. Skontrolujte aj priečinok so spamom, je to najčastejšia
  príčina dojmu, že formulár nefunguje.
- **Právne stránky sú skontrolované.** Ochrana osobných údajov, obchodné
  podmienky a zásady cookies musia sedieť s reálnym fungovaním firmy. Text
  si prejdite skôr, ako web pustíte von.
- **Doména je nastavená v `NEXT_PUBLIC_SITE_URL`.** Hodnota sa zhoduje so
  skutočnou adresou webu vrátane `https://` a projekt bol po jej zmene nasadený
  znova. Overiť sa dá otvorením `/sitemap.xml`, kde musia byť adresy na
  správnej doméne.
