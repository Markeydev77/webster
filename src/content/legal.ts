/**
 * Právne dokumenty: ochrana osobných údajov, obchodné podmienky, cookies.
 *
 * Text opisuje výhradne to, čo web reálne robí: dva formuláre, odoslanie
 * e-mailom cez Resend, hosting Vercel, žiadna databáza, žiadna analytika,
 * žiadne externé embedy. Nič sa tu netvrdí "do zásoby".
 *
 * Firemné údaje (IČO, adresa, kontakty) sa sem zámerne nepíšu. Berú sa
 * výhradne zo `site.legal` a `site.contact`, aby existoval jediný zdroj pravdy.
 */

export type Bilingual = { sk: string; en: string };

export type LegalSection = {
  heading: Bilingual;
  paragraphs: Bilingual[];
};

export type LegalDocument = {
  id: "privacy" | "terms" | "cookies";
  lead: Bilingual;
  sections: LegalSection[];
};

/**
 * Dátum poslednej aktualizácie je konštanta, nie `new Date()`. Inak by sa
 * pri každom builde menil a dokument by pôsobil ako priebežne prepisovaný.
 */
export const LEGAL_UPDATED = "2026-09-08";

/** Popisky identifikačných údajov prevádzkovateľa. */
export const legalIdentityLabels = {
  operator: { sk: "Prevádzkovateľ", en: "Operator" },
  entity: { sk: "Obchodné meno", en: "Business name" },
  ico: { sk: "IČO", en: "Company ID (IČO)" },
  dic: { sk: "DIČ", en: "Tax ID (DIČ)" },
  icDph: { sk: "IČ DPH", en: "VAT ID (IČ DPH)" },
  registration: { sk: "Registrácia", en: "Registration" },
  address: { sk: "Adresa", en: "Address" },
  email: { sk: "E-mail", en: "Email" },
  phone: { sk: "Telefón", en: "Phone" },
} satisfies Record<string, Bilingual>;

/** Poctivé upozornenie: text nie je právne overený. */
export const legalReviewNote: Bilingual = {
  sk: "Tento text pripravil dodávateľ webu ako vecný podklad, ktorý zodpovedá skutočnému fungovaniu stránky. Pred spustením webu ho dajte skontrolovať právnikovi a doplňte údaje viažuce sa na konkrétny podnikateľský subjekt. Nejde o právne overený dokument ani o právne poradenstvo.",
  en: "This text was prepared by the website supplier as a factual draft that reflects how the site actually works. Have it reviewed by a lawyer before the site goes live and complete the details specific to the business entity. It is not a legally verified document and it is not legal advice.",
};

/* -------------------------------------------------------------------------
   Ochrana osobných údajov
------------------------------------------------------------------------- */

export const privacyPolicy: LegalDocument = {
  id: "privacy",
  lead: {
    sk: "Tieto zásady vysvetľujú, aké osobné údaje o vás spracúvame, keď nám napíšete cez formulár na tomto webe, na aký účel to robíme, ako dlho ich uchovávame a aké práva pri tom máte.",
    en: "This policy explains what personal data we process when you write to us through a form on this website, why we process it, how long we keep it and what rights you have.",
  },
  sections: [
    {
      heading: { sk: "Prevádzkovateľ", en: "Controller" },
      paragraphs: [
        {
          sk: "Prevádzkovateľom osobných údajov spracúvaných prostredníctvom tohto webu je podnikateľský subjekt prevádzkujúci značku Webster Sound & Light, ktorá poskytuje technické zabezpečenie podujatí. Jeho identifikačné a kontaktné údaje sú uvedené v úvodnej časti tejto stránky a v sekcii Kontakt.",
          en: "The controller of personal data processed through this website is the business operating the Webster Sound & Light brand, which provides technical production for events. Its identification and contact details are set out at the top of this page and in the Contact section.",
        },
        {
          sk: "Prevádzkovateľ nemá povinnosť určiť zodpovednú osobu podľa článku 37 GDPR, pretože nevykonáva rozsiahle systematické monitorovanie dotknutých osôb ani rozsiahle spracúvanie osobitných kategórií údajov. Vo veciach ochrany osobných údajov sa preto obracajte priamo na kontakty prevádzkovateľa.",
          en: "The controller is not required to appoint a data protection officer under Article 37 of the GDPR, as it carries out neither large scale systematic monitoring of data subjects nor large scale processing of special categories of data. Please therefore address any data protection matter to the controller directly.",
        },
      ],
    },
    {
      heading: { sk: "Aké údaje spracúvame", en: "What data we process" },
      paragraphs: [
        {
          sk: "Web nemá používateľské účty, prihlasovanie ani databázu návštevníkov. Osobné údaje spracúvame len vtedy, keď nám ich sami odošlete prostredníctvom jedného z dvoch formulárov.",
          en: "The site has no user accounts, no sign in and no visitor database. We process personal data only when you send it to us yourself through one of the two forms.",
        },
        {
          sk: "Rezervačný formulár: meno a priezvisko, telefónne číslo, e-mailová adresa, dátum podujatia, typ podujatia, voliteľné upresnenie typu podujatia a voliteľná správa s ďalšími informáciami o podujatí.",
          en: "Booking form: full name, phone number, email address, event date, type of event, an optional clarification of the event type and an optional message with further details about the event.",
        },
        {
          sk: "Kontaktný formulár: meno, e-mailová adresa a text správy.",
          en: "Contact form: name, email address and the text of your message.",
        },
        {
          sk: "Súčasťou odoslania je aj údaj o tom, že ste zaškrtli povinné políčko so súhlasom. Potrebujeme ho na preukázanie, že sme si splnili informačnú povinnosť.",
          en: "The submission also records the fact that you ticked the mandatory consent box. We need this in order to demonstrate that we met our information duty.",
        },
        {
          sk: "Do voľného textu správy prosím neuvádzajte údaje, ktoré s dopytom nesúvisia, najmä údaje o zdravotnom stave, rodné číslo, čísla dokladov ani platobné údaje. Na ich spracúvanie nemáme dôvod ani právny základ.",
          en: "Please do not enter data unrelated to your enquiry into the free text message, in particular health data, personal identification numbers, document numbers or payment details. We have neither a reason nor a legal basis to process them.",
        },
      ],
    },
    {
      heading: { sk: "Účel spracúvania", en: "Purpose of processing" },
      paragraphs: [
        {
          sk: "Údaje z formulárov spracúvame na jediný účel: vybaviť vašu požiadavku, odpovedať na ňu a viesť s vami predzmluvnú komunikáciu o technickom zabezpečení podujatia, teda overiť dostupnosť termínu a techniky a pripraviť cenovú ponuku.",
          en: "We process form data for a single purpose: to handle your request, to reply to it and to conduct pre contractual communication with you about the technical production of your event, meaning to check availability of the date and the equipment and to prepare a quotation.",
        },
        {
          sk: "Údaje nepoužívame na marketing. Nezasielame na ich základe newsletter, nevytvárame z nich databázu kontaktov na neskoršie oslovovanie a neposkytujeme ich nikomu na jeho vlastné obchodné účely.",
          en: "We do not use the data for marketing. We do not send newsletters on its basis, we do not build a contact database for later outreach and we do not pass it to anyone for their own commercial purposes.",
        },
      ],
    },
    {
      heading: { sk: "Právny základ", en: "Legal basis" },
      paragraphs: [
        {
          sk: "Spracúvanie na účel odpovede na dopyt a prípravy zmluvy sa opiera o článok 6 ods. 1 písm. b) GDPR, teda o vykonanie opatrení pred uzatvorením zmluvy na vašu žiadosť.",
          en: "Processing for the purpose of answering your enquiry and preparing a contract is based on Article 6(1)(b) of the GDPR, that is, taking steps at your request prior to entering into a contract.",
        },
        {
          sk: "Zaškrtnutím povinného políčka pri odoslaní formulára nám zároveň udeľujete súhlas podľa článku 6 ods. 1 písm. a) GDPR. Súhlas môžete kedykoľvek odvolať; odvolanie nemá vplyv na zákonnosť spracúvania pred jeho odvolaním.",
          en: "By ticking the mandatory box when you submit the form you also give consent under Article 6(1)(a) of the GDPR. You may withdraw that consent at any time; withdrawal does not affect the lawfulness of processing carried out before it.",
        },
        {
          sk: "Ak z dopytu vznikne objednávka, spracúvanie údajov nevyhnutných na plnenie zmluvy sa ďalej opiera o článok 6 ods. 1 písm. b) GDPR a spracúvanie na účtovné a daňové účely o článok 6 ods. 1 písm. c) GDPR.",
          en: "If the enquiry results in an order, the processing of data necessary to perform the contract is further based on Article 6(1)(b) of the GDPR, and processing for accounting and tax purposes on Article 6(1)(c) of the GDPR.",
        },
      ],
    },
    {
      heading: { sk: "Doba uchovávania", en: "Retention period" },
      paragraphs: [
        {
          sk: "E-mail s obsahom formulára uchovávame po dobu nevyhnutnú na vybavenie dopytu a na nadväzujúcu komunikáciu, najviac však dva roky od posledného kontaktu s vami. Potom správu odstránime.",
          en: "We keep the email containing your form submission for as long as is necessary to handle the enquiry and any follow up communication, and no longer than two years from our last contact with you. We then delete the message.",
        },
        {
          sk: "Ak z dopytu vznikne zmluva, údaje uchovávame po dobu jej plnenia a následne po dobu, ktorú vyžadujú predpisy o účtovníctve a archivácii, spravidla desať rokov od skončenia účtovného obdobia, ktorého sa týkajú.",
          en: "If the enquiry leads to a contract, we keep the data for the duration of its performance and thereafter for the period required by accounting and archiving legislation, as a rule ten years from the end of the accounting period to which it relates.",
        },
        {
          sk: "Ak súhlas odvoláte skôr a spracúvanie nie je nevyhnutné na iný právny základ, správu odstránime bezodkladne.",
          en: "If you withdraw your consent earlier and the processing is not necessary on another legal basis, we delete the message without undue delay.",
        },
      ],
    },
    {
      heading: { sk: "Príjemcovia a sprostredkovatelia", en: "Recipients and processors" },
      paragraphs: [
        {
          sk: "Údaje z formulárov neukladáme do žiadnej databázy a na tomto webe nevzniká ich záznam. Formulár ich odošle e-mailom prevádzkovateľovi a ďalej sa spracúvajú v jeho bežnej e-mailovej schránke.",
          en: "Form data is not stored in any database and no record of it is created on this website. The form sends it by email to the controller, where it is then handled in an ordinary mailbox.",
        },
        {
          sk: "Na doručenie e-mailu využívame službu Resend (Resend, Inc.). Vystupuje ako sprostredkovateľ a údaje z formulára spracúva výlučne na účel odoslania a doručenia správy prevádzkovateľovi.",
          en: "We use the Resend service (Resend, Inc.) to deliver the email. It acts as a processor and handles the form data solely in order to send and deliver the message to the controller.",
        },
        {
          sk: "Web je hosťovaný na platforme Vercel (Vercel, Inc.). Vystupuje ako sprostredkovateľ pri prevádzke webu a spracúva technické údaje o požiadavkách na server, napríklad IP adresu a typ prehliadača, na účel prevádzky, dostupnosti a bezpečnosti stránky.",
          en: "The website is hosted on the Vercel platform (Vercel, Inc.). It acts as a processor for the operation of the site and handles technical request data such as IP address and browser type for the purposes of running, availability and security of the site.",
        },
        {
          sk: "Ďalším príjemcom môže byť poskytovateľ e-mailovej schránky prevádzkovateľa a v odôvodnených prípadoch účtovník, právny zástupca alebo orgán verejnej moci, ak nám sprístupnenie ukladá zákon.",
          en: "Further recipients may be the provider of the controller's mailbox and, where justified, an accountant, a legal representative or a public authority where disclosure is required by law.",
        },
      ],
    },
    {
      heading: { sk: "Prenos do tretích krajín", en: "Transfers to third countries" },
      paragraphs: [
        {
          sk: "Uvedení poskytovatelia sú spoločnosti so sídlom mimo Európskeho hospodárskeho priestoru, preto môže pri spracúvaní dôjsť k prenosu údajov do tretej krajiny, najmä do Spojených štátov amerických.",
          en: "The providers named above are companies established outside the European Economic Area, so processing may involve a transfer of data to a third country, in particular to the United States.",
        },
        {
          sk: "Takýto prenos sa uskutočňuje na základe primeraných záruk podľa kapitoly V GDPR, spravidla na základe štandardných zmluvných doložiek schválených Európskou komisiou alebo na základe rozhodnutia o primeranosti. Aktuálne podmienky prenosu zverejňujú títo poskytovatelia vo svojich dokumentoch o ochrane súkromia.",
          en: "Any such transfer takes place under appropriate safeguards pursuant to Chapter V of the GDPR, as a rule on the basis of standard contractual clauses approved by the European Commission or on the basis of an adequacy decision. The current transfer terms are published by these providers in their own privacy documentation.",
        },
      ],
    },
    {
      heading: { sk: "Vaše práva", en: "Your rights" },
      paragraphs: [
        {
          sk: "Ako dotknutá osoba máte podľa článkov 15 až 22 GDPR právo na prístup k svojim údajom, právo na ich opravu, právo na vymazanie, právo na obmedzenie spracúvania, právo na prenosnosť údajov a právo namietať proti spracúvaniu.",
          en: "As a data subject you have, under Articles 15 to 22 of the GDPR, the right of access to your data, the right to rectification, the right to erasure, the right to restriction of processing, the right to data portability and the right to object to processing.",
        },
        {
          sk: "Máte tiež právo kedykoľvek odvolať udelený súhlas a právo podať sťažnosť dozornému orgánu. Dozorným orgánom v Slovenskej republike je Úrad na ochranu osobných údajov Slovenskej republiky, ktorého kontakty a formuláre nájdete na jeho webovej stránke dataprotection.gov.sk.",
          en: "You also have the right to withdraw your consent at any time and the right to lodge a complaint with a supervisory authority. In the Slovak Republic the supervisory authority is the Office for Personal Data Protection of the Slovak Republic, whose contact details and forms are available on its website at dataprotection.gov.sk.",
        },
        {
          sk: "Žiadosť vybavíme bez zbytočného odkladu, najneskôr do jedného mesiaca od jej doručenia. Ak je žiadosť zložitá alebo ich je viac, môžeme lehotu predĺžiť o ďalšie dva mesiace; o predĺžení a jeho dôvodoch vás budeme informovať.",
          en: "We will deal with your request without undue delay and at the latest within one month of receiving it. If the request is complex or if there are several of them, we may extend that period by a further two months; we will inform you of the extension and its reasons.",
        },
      ],
    },
    {
      heading: { sk: "Dobrovoľnosť poskytnutia údajov", en: "Providing data is voluntary" },
      paragraphs: [
        {
          sk: "Poskytnutie údajov je dobrovoľné. Nemáte zákonnú ani zmluvnú povinnosť nám ich poskytnúť a ich neposkytnutie nemá pre vás žiadny nepriaznivý následok.",
          en: "Providing your data is voluntary. You are under no statutory or contractual obligation to provide it, and not providing it has no adverse consequences for you.",
        },
        {
          sk: "Bez mena a aspoň jedného kontaktu vám však nevieme odpovedať a bez dátumu a typu podujatia nevieme posúdiť, či máme na daný termín voľnú techniku. Ak formulár použiť nechcete, kontaktujte nás priamo telefonicky alebo e-mailom.",
          en: "Without your name and at least one contact detail, however, we cannot reply to you, and without the date and type of event we cannot assess whether we have equipment free for that date. If you prefer not to use the form, contact us directly by phone or email.",
        },
      ],
    },
    {
      heading: {
        sk: "Automatizované rozhodovanie a profilovanie",
        en: "Automated decision making and profiling",
      },
      paragraphs: [
        {
          sk: "Vaše údaje nepodliehajú automatizovanému individuálnemu rozhodovaniu ani profilovaniu podľa článku 22 GDPR. Každý dopyt posudzuje a vybavuje človek.",
          en: "Your data is not subject to automated individual decision making or profiling within the meaning of Article 22 of the GDPR. Every enquiry is assessed and handled by a person.",
        },
        {
          sk: "Web nepoužíva analytické nástroje, reklamné systémy ani skripty na sledovanie správania návštevníkov, takže o vás nevznikajú žiadne profily, skóre ani marketingové segmenty.",
          en: "The site uses no analytics tools, no advertising systems and no scripts that track visitor behaviour, so no profiles, scores or marketing segments about you are created.",
        },
      ],
    },
    {
      heading: { sk: "Zabezpečenie údajov", en: "Data security" },
      paragraphs: [
        {
          sk: "Web je dostupný výlučne cez šifrované spojenie HTTPS, takže obsah formulára sa na server prenáša šifrovane. Prístup do e-mailovej schránky, do ktorej správy prichádzajú, je chránený heslom a je obmedzený na osoby, ktoré dopyty vybavujú.",
          en: "The site is served exclusively over an encrypted HTTPS connection, so the contents of the form are transmitted to the server in encrypted form. Access to the mailbox that receives the messages is password protected and limited to the people who handle enquiries.",
        },
      ],
    },
    {
      heading: { sk: "Uplatnenie práv a kontakt", en: "Exercising your rights and contact" },
      paragraphs: [
        {
          sk: "Svoje práva si môžete uplatniť na kontaktoch prevádzkovateľa uvedených na tejto stránke a v sekcii Kontakt. Postačuje neformálna žiadosť, v ktorej uvediete, čoho sa týka a aké právo si uplatňujete.",
          en: "You can exercise your rights using the controller's contact details given on this page and in the Contact section. An informal request stating what it concerns and which right you are exercising is sufficient.",
        },
        {
          sk: "Aby sme údaje nesprístupnili nesprávnej osobe, môžeme vás požiadať o doplňujúcu informáciu potrebnú na overenie totožnosti, napríklad o potvrdenie z e-mailovej adresy, z ktorej pôvodný dopyt prišiel.",
          en: "To avoid disclosing data to the wrong person, we may ask you for additional information needed to verify your identity, for example confirmation from the email address the original enquiry came from.",
        },
      ],
    },
    {
      heading: { sk: "Zmeny týchto zásad", en: "Changes to this policy" },
      paragraphs: [
        {
          sk: "Zásady môžeme aktualizovať, ak sa zmení rozsah spracúvania, použité nástroje alebo právna úprava. Aktuálne znenie je vždy dostupné na tejto adrese spolu s dátumom poslednej aktualizácie.",
          en: "We may update this policy if the scope of processing, the tools used or the applicable law change. The current version is always available at this address together with the date of the last update.",
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------
   Obchodné podmienky
------------------------------------------------------------------------- */

export const termsAndConditions: LegalDocument = {
  id: "terms",
  lead: {
    sk: "Tieto podmienky upravujú vzťah medzi poskytovateľom technického zabezpečenia podujatí a objednávateľom. Tento web nie je e-shop: nedá sa cez neho nič kúpiť ani zaplatiť, slúži na predstavenie služieb a na zaslanie nezáväzného dopytu.",
    en: "These terms govern the relationship between the provider of technical event production and the customer. This website is not an online shop: nothing can be bought or paid for through it. It presents our services and lets you send a non binding enquiry.",
  },
  sections: [
    {
      heading: { sk: "Úvodné ustanovenia", en: "Introductory provisions" },
      paragraphs: [
        {
          sk: "Tieto podmienky sa vzťahujú na služby prenájmu techniky a technického zabezpečenia podujatí, ktoré poskytuje podnikateľský subjekt prevádzkujúci značku Webster Sound & Light (ďalej len poskytovateľ), a na osobu, ktorá si tieto služby objedná (ďalej len objednávateľ).",
          en: "These terms apply to the equipment rental and technical event production services provided by the business operating the Webster Sound & Light brand (the provider) and to the person who orders those services (the customer).",
        },
        {
          sk: "Podmienky sa uplatnia v rozsahu, v akom si zmluvné strany písomne nedohodli inak. Individuálna písomná dohoda má vždy prednosť pred týmito podmienkami.",
          en: "The terms apply to the extent that the parties have not agreed otherwise in writing. An individual written agreement always prevails over these terms.",
        },
      ],
    },
    {
      heading: { sk: "Poskytovateľ", en: "The provider" },
      paragraphs: [
        {
          sk: "Poskytovateľom je podnikateľský subjekt prevádzkujúci značku Webster Sound & Light. Jeho obchodné meno, identifikačné údaje a kontakty sú uvedené v úvodnej časti tejto stránky a v sekcii Kontakt.",
          en: "The provider is the business operating the Webster Sound & Light brand. Its business name, identification details and contacts are set out at the top of this page and in the Contact section.",
        },
        {
          sk: "Poskytovateľ pôsobí na Orave a po celom Slovensku. Miesto plnenia sa určuje podľa miesta konania konkrétneho podujatia dohodnutého v potvrdenej objednávke.",
          en: "The provider operates in the Orava region and across Slovakia. The place of performance is the venue of the specific event agreed in the confirmed order.",
        },
      ],
    },
    {
      heading: { sk: "Predmet služieb", en: "Scope of services" },
      paragraphs: [
        {
          sk: "Predmetom služieb je prenájom zvukovej, svetelnej, pódiovej a obrazovej techniky a technické zabezpečenie podujatí vrátane dopravy, montáže, obsluhy počas programu a demontáže, a to v rozsahu dohodnutom pre konkrétne podujatie.",
          en: "The services consist of renting sound, lighting, staging and screen equipment and providing technical production for events, including transport, rigging, operation during the programme and de rigging, in the scope agreed for the specific event.",
        },
        {
          sk: "Presné zloženie zostavy, počet kusov techniky a rozsah obsluhy sa určuje individuálne podľa typu podujatia, veľkosti a charakteru priestoru a predpokladaného počtu návštevníkov.",
          en: "The exact configuration, the number of items of equipment and the size of the operating crew are determined individually according to the type of event, the size and character of the venue and the expected number of visitors.",
        },
        {
          sk: "Prehľad techniky zverejnený na webe je prezentačný. Nie je záväznou ponukou ani katalógom na okamžitú objednávku a nezakladá nárok na dodanie konkrétneho kusu zariadenia.",
          en: "The equipment overview published on the site is presentational. It is not a binding offer, it is not a catalogue for immediate ordering and it creates no entitlement to any particular item of equipment.",
        },
      ],
    },
    {
      heading: { sk: "Dopyt a vznik zmluvy", en: "Enquiry and formation of the contract" },
      paragraphs: [
        {
          sk: "Odoslanie rezervačného alebo kontaktného formulára je nezáväzným dopytom. Nie je objednávkou, nezakladá rezerváciu termínu ani nárok na poskytnutie služby a nevzniká ním zmluva.",
          en: "Submitting the booking form or the contact form is a non binding enquiry. It is not an order, it does not reserve a date, it creates no claim to the service and it does not form a contract.",
        },
        {
          sk: "Po doručení dopytu poskytovateľ overí dostupnosť termínu a techniky a kontaktuje objednávateľa s cenovou ponukou alebo s upresňujúcimi otázkami.",
          en: "After receiving an enquiry the provider checks the availability of the date and the equipment and contacts the customer with a quotation or with clarifying questions.",
        },
        {
          sk: "Zmluva vzniká až individuálnym potvrdením objednávky zo strany poskytovateľa, a to písomne alebo e-mailom, prípadne podpisom samostatnej zmluvy. Termín je rezervovaný až od tohto potvrdenia.",
          en: "The contract is formed only when the provider individually confirms the order in writing or by email, or when a separate contract is signed. The date is reserved only from that confirmation onwards.",
        },
        {
          sk: "Poskytovateľ nie je povinný dopyt prijať, najmä ak je termín obsadený, ak požadovaná technika nie je k dispozícii alebo ak podmienky na mieste neumožňujú bezpečnú realizáciu.",
          en: "The provider is under no obligation to accept an enquiry, in particular where the date is already taken, where the requested equipment is unavailable or where conditions at the venue do not allow safe delivery.",
        },
      ],
    },
    {
      heading: { sk: "Cena a platobné podmienky", en: "Price and payment terms" },
      paragraphs: [
        {
          sk: "Cena sa dojednáva individuálne pre každé podujatie na základe rozsahu techniky, počtu členov obsluhy, dĺžky programu, vzdialenosti miesta konania a náročnosti montáže. Web neobsahuje cenník ani ceny jednotlivých položiek.",
          en: "The price is agreed individually for each event on the basis of the scope of equipment, the size of the crew, the length of the programme, the distance to the venue and the complexity of the rigging. The site contains no price list and no item prices.",
        },
        {
          sk: "Cena je záväzná v rozsahu uvedenom v potvrdenej ponuke. Ak objednávateľ na mieste požiada o rozšírenie rozsahu nad rámec potvrdenej ponuky, poskytovateľ ho vykoná len ak je to technicky a bezpečnostne možné, a dodatočné plnenie sa doúčtuje.",
          en: "The price is binding to the extent set out in the confirmed quotation. If the customer requests an extension of scope on site beyond the confirmed quotation, the provider will carry it out only where this is technically and safely possible, and the additional work is charged separately.",
        },
        {
          sk: "Platba prebieha na základe faktúry alebo iným individuálne dohodnutým spôsobom. Poskytovateľ môže požadovať zálohu, najmä pri väčších podujatiach a pri rezervácii termínu vo vysokej sezóne.",
          en: "Payment is made against an invoice or in another individually agreed manner. The provider may require a deposit, in particular for larger events and when reserving a date in the high season.",
        },
        {
          sk: "Cez tento web nie je možné vykonať žiadnu platbu. Web neobsahuje nákupný košík, platobnú bránu ani objednávkový systém.",
          en: "No payment can be made through this website. The site has no shopping cart, no payment gateway and no ordering system.",
        },
      ],
    },
    {
      heading: { sk: "Povinnosti objednávateľa", en: "Obligations of the customer" },
      paragraphs: [
        {
          sk: "Objednávateľ zabezpečí na vlastné náklady prístupovú cestu pre dodávkové vozidlo až k miestu montáže, spevnenú a dostatočne rovnú plochu pre pódium alebo strechu a priestor potrebný na postavenie techniky.",
          en: "The customer shall provide, at its own cost, vehicle access up to the rigging location, a firm and sufficiently level surface for the stage or roof, and the space needed to set up the equipment.",
        },
        {
          sk: "Objednávateľ zabezpečí elektrickú prípojku s dostatočným príkonom a s platnou revíziou, umiestnenú v dosahu miesta montáže. Ak parametre prípojky nezodpovedajú dohodnutému rozsahu techniky, poskytovateľ môže rozsah plnenia primerane obmedziť.",
          en: "The customer shall provide a power supply of sufficient capacity with a valid inspection certificate, located within reach of the rigging position. If the supply does not match the agreed scope of equipment, the provider may reduce the scope of performance accordingly.",
        },
        {
          sk: "Objednávateľ zabezpečí povolenia potrebné na konanie podujatia, ohlásenie hudobnej produkcie príslušnej organizácii kolektívnej správy práv a dodržanie limitov hluku a času konania podujatia.",
          en: "The customer shall obtain the permits required to hold the event, notify the relevant collective rights management organisation of the musical performance and ensure compliance with noise limits and permitted event hours.",
        },
        {
          sk: "Objednávateľ poskytne súčinnosť pri montáži a demontáži, sprístupní miesto v dohodnutom čase a zabezpečí, aby technika nebola vystavená prístupu neoprávnených osôb.",
          en: "The customer shall cooperate during rigging and de rigging, make the venue accessible at the agreed time and ensure that the equipment is not exposed to access by unauthorised persons.",
        },
        {
          sk: "Ak sa strany nedohodnú inak, objednávateľ zodpovedá za stráženie miesta v čase medzi montážou a začiatkom programu, ako aj v noci medzi jednotlivými dňami viacdňového podujatia.",
          en: "Unless the parties agree otherwise, the customer is responsible for guarding the site between rigging and the start of the programme, and overnight between the days of a multi day event.",
        },
      ],
    },
    {
      heading: { sk: "Povinnosti poskytovateľa", en: "Obligations of the provider" },
      paragraphs: [
        {
          sk: "Poskytovateľ dodá techniku v dohodnutom rozsahu, v prevádzkyschopnom stave a v dohodnutom čase, postaví ju, počas programu zabezpečí obsluhu v dohodnutom rozsahu a po skončení podujatia ju demontuje a odvezie.",
          en: "The provider shall deliver the equipment in the agreed scope, in working order and at the agreed time, set it up, provide the agreed level of operation during the programme, and de rig and remove it after the event.",
        },
        {
          sk: "Poskytovateľ zodpovedá za odbornú obsluhu techniky a za dodržanie bezpečnostných postupov pri montáži pódiových a strešných konštrukcií vrátane pokynov výrobcu konštrukcie.",
          en: "The provider is responsible for the competent operation of the equipment and for compliance with safety procedures when rigging stage and roof structures, including the manufacturer's instructions.",
        },
        {
          sk: "Ak počas podujatia dôjde k poruche časti techniky, poskytovateľ ju bezodkladne nahradí náhradným zariadením, ak ho má k dispozícii, alebo upraví zostavu tak, aby program mohol pokračovať.",
          en: "If part of the equipment fails during the event, the provider will replace it without delay with a spare unit where one is available, or adjust the setup so that the programme can continue.",
        },
      ],
    },
    {
      heading: {
        sk: "Zodpovednosť za škodu a za zapožičanú techniku",
        en: "Liability for damage and for rented equipment",
      },
      paragraphs: [
        {
          sk: "Objednávateľ zodpovedá za škodu na technike, ktorá vznikne od jej postavenia na mieste do jej odovzdania späť poskytovateľovi, ak ju spôsobil on, jeho zamestnanci, účinkujúci, dodávatelia alebo návštevníci podujatia.",
          en: "The customer is liable for damage to the equipment arising between its set up at the venue and its handover back to the provider, where such damage is caused by the customer, its staff, performers, suppliers or event visitors.",
        },
        {
          sk: "Ide najmä o škodu spôsobenú vyliatím nápojov na techniku, pádom osôb na konštrukcie, manipuláciou neoprávnenými osobami, ako aj o odcudzenie techniky v čase, keď za jej stráženie zodpovedá objednávateľ.",
          en: "This covers in particular damage caused by drinks spilled on the equipment, persons falling onto structures, handling by unauthorised persons, and theft of equipment during periods when the customer is responsible for guarding it.",
        },
        {
          sk: "Poskytovateľ zodpovedá za škodu, ktorú spôsobí porušením svojich povinností. Nezodpovedá za ušlý zisk objednávateľa ani za nepriamu škodu a výška náhrady sa obmedzuje na cenu dohodnutú za konkrétne podujatie, ak zákon neustanovuje inak.",
          en: "The provider is liable for damage caused by breach of its own obligations. It is not liable for the customer's lost profit or for indirect damage, and compensation is limited to the price agreed for the specific event, unless the law provides otherwise.",
        },
        {
          sk: "Poskytovateľ nezodpovedá za obsah programu, za konanie účinkujúcich ani za škodu spôsobenú technikou, ktorú na miesto priniesol iný dodávateľ.",
          en: "The provider is not liable for the content of the programme, for the conduct of performers, or for damage caused by equipment brought to the venue by another supplier.",
        },
      ],
    },
    {
      heading: {
        sk: "Vyššia moc a poveternostné podmienky",
        en: "Force majeure and weather conditions",
      },
      paragraphs: [
        {
          sk: "Žiadna zo strán nezodpovedá za nesplnenie povinnosti, ktorému zabránila okolnosť vylučujúca zodpovednosť, najmä živelná udalosť, výpadok elektrickej siete, úradný zákaz, dopravná nehoda alebo iná prekážka nezávislá od jej vôle.",
          en: "Neither party is liable for a failure to perform prevented by an event of force majeure, in particular a natural event, a power outage, an official ban, a road accident or another obstacle beyond its control.",
        },
        {
          sk: "Vonkajšie pódiové a strešné konštrukcie majú výrobcom určené limity zaťaženia vetrom, dažďom a snehom. Ak poveternostné podmienky prekročia bezpečné hodnoty, poskytovateľ je oprávnený a zároveň povinný obmedziť alebo prerušiť prevádzku konštrukcie, prípadne spustiť bočnice, znížiť strechu alebo ju demontovať.",
          en: "Outdoor stage and roof structures have wind, rain and snow load limits set by the manufacturer. If weather conditions exceed safe values, the provider is entitled and indeed obliged to limit or suspend the use of the structure, and where necessary to lower side panels, lower the roof or dismantle it.",
        },
        {
          sk: "Rozhodnutie o obmedzení alebo prerušení z bezpečnostných dôvodov robí poverený technik poskytovateľa a objednávateľ je povinný ho rešpektovať. Takéto rozhodnutie sa nepovažuje za porušenie zmluvy zo strany poskytovateľa.",
          en: "The decision to limit or suspend operation for safety reasons is taken by the provider's designated technician and the customer is obliged to respect it. Such a decision is not a breach of contract by the provider.",
        },
        {
          sk: "Za prerušenie z bezpečnostných dôvodov nevzniká nárok na zľavu z ceny za plnenie, ktoré už bolo poskytnuté, teda za dopravu, montáž a pripravenosť techniky.",
          en: "A suspension for safety reasons creates no entitlement to a price reduction for performance already delivered, that is, for transport, rigging and having the equipment ready.",
        },
      ],
    },
    {
      heading: { sk: "Storno a zmena termínu", en: "Cancellation and change of date" },
      paragraphs: [
        {
          sk: "Objednávateľ môže potvrdenú objednávku zrušiť. Zrušenie je potrebné oznámiť písomne alebo e-mailom, pričom rozhodujúci je deň doručenia oznámenia poskytovateľovi.",
          en: "The customer may cancel a confirmed order. Cancellation must be notified in writing or by email, and the decisive date is the day the notice reaches the provider.",
        },
        {
          sk: "Ak nie je individuálne dohodnuté inak, poskytovateľ si pri zrušení krátko pred podujatím môže uplatniť náhradu preukázateľne vynaložených nákladov, najmä nákladov na už objednanú subdodávku, dopravu a rezervovanú obsluhu.",
          en: "Unless individually agreed otherwise, on cancellation shortly before the event the provider may claim reimbursement of demonstrably incurred costs, in particular for subcontracted services already ordered, transport and crew already booked.",
        },
        {
          sk: "Zmena termínu je možná po dohode a podľa voľnej kapacity. Presun na nový termín nie je nárokovateľný; ak poskytovateľ v novom termíne kapacitu nemá, postupuje sa ako pri zrušení objednávky.",
          en: "A change of date is possible by agreement and subject to available capacity. There is no entitlement to a new date; if the provider has no capacity on the new date, the order is treated as cancelled.",
        },
        {
          sk: "Ak plnenie zmarí okolnosť vylučujúca zodpovednosť, ktorá nastala nezávisle od vôle oboch strán, strany sa prednostne dohodnú na náhradnom termíne.",
          en: "If performance is frustrated by an event of force majeure arising independently of the will of both parties, the parties will primarily seek to agree on an alternative date.",
        },
      ],
    },
    {
      heading: { sk: "Reklamácie", en: "Complaints" },
      paragraphs: [
        {
          sk: "Ak plnenie nezodpovedá dohodnutému rozsahu, objednávateľ na to upozorní poverenú osobu poskytovateľa priamo na mieste, aby bolo možné nedostatok odstrániť ešte počas podujatia.",
          en: "If performance does not match the agreed scope, the customer shall notify the provider's designated person on site, so that the shortcoming can be remedied while the event is still running.",
        },
        {
          sk: "Reklamáciu je možné uplatniť aj následne, písomne alebo e-mailom na kontaktoch poskytovateľa, bez zbytočného odkladu po podujatí. V reklamácii uveďte podujatie a jeho dátum, opis nedostatku a to, čo požadujete.",
          en: "A complaint may also be made afterwards, in writing or by email to the provider's contacts, without undue delay after the event. Please state the event and its date, describe the shortcoming and say what remedy you are seeking.",
        },
        {
          sk: "Poskytovateľ potvrdí prijatie reklamácie a vybaví ju bez zbytočného odkladu. Ak je objednávateľom spotrebiteľ, poskytovateľ vybaví reklamáciu najneskôr do 30 dní od jej uplatnenia.",
          en: "The provider will acknowledge receipt of the complaint and deal with it without undue delay. Where the customer is a consumer, the provider will settle the complaint within 30 days of it being made at the latest.",
        },
      ],
    },
    {
      heading: {
        sk: "Alternatívne riešenie spotrebiteľských sporov",
        en: "Alternative dispute resolution for consumers",
      },
      paragraphs: [
        {
          sk: "Ak je objednávateľ spotrebiteľom a nie je spokojný so spôsobom vybavenia reklamácie, má právo obrátiť sa na poskytovateľa so žiadosťou o nápravu. Ak poskytovateľ odpovie zamietavo alebo neodpovie do 30 dní od odoslania žiadosti, spotrebiteľ má právo podať návrh na začatie alternatívneho riešenia sporu.",
          en: "Where the customer is a consumer and is not satisfied with the way a complaint was handled, the consumer has the right to ask the provider for redress. If the provider responds with a rejection or does not respond within 30 days of the request being sent, the consumer may file a proposal to start alternative dispute resolution.",
        },
        {
          sk: "Subjektom alternatívneho riešenia sporov je Slovenská obchodná inšpekcia alebo iná oprávnená právnická osoba zapísaná v zozname subjektov alternatívneho riešenia sporov, ktorý vedie Ministerstvo hospodárstva Slovenskej republiky. Návrh sa podáva písomne alebo elektronicky prostredníctvom podateľne zvoleného subjektu.",
          en: "The alternative dispute resolution body is the Slovak Trade Inspection or another authorised legal entity entered in the list of alternative dispute resolution bodies maintained by the Ministry of Economy of the Slovak Republic. The proposal is filed in writing or electronically through the chosen body's filing office.",
        },
        {
          sk: "Európska platforma na riešenie sporov online (ODR) ukončila prevádzku v júli 2025, preto sa návrh podáva priamo subjektu alternatívneho riešenia sporov podľa predchádzajúceho odseku.",
          en: "The European Online Dispute Resolution (ODR) platform ceased operating in July 2025, so proposals are filed directly with an alternative dispute resolution body as described in the previous paragraph.",
        },
      ],
    },
    {
      heading: { sk: "Rozhodné právo a účinnosť", en: "Governing law and effect" },
      paragraphs: [
        {
          sk: "Vzťahy neupravené týmito podmienkami sa riadia právnym poriadkom Slovenskej republiky, najmä Občianskym zákonníkom alebo Obchodným zákonníkom podľa postavenia zmluvných strán, a ak je objednávateľom spotrebiteľ, aj predpismi na ochranu spotrebiteľa.",
          en: "Matters not covered by these terms are governed by the law of the Slovak Republic, in particular the Civil Code or the Commercial Code depending on the standing of the parties, and, where the customer is a consumer, also by consumer protection legislation.",
        },
        {
          sk: "Poskytovateľ môže tieto podmienky meniť. Na už potvrdenú objednávku sa vždy vzťahuje znenie účinné v deň jej potvrdenia. Aktuálne znenie je dostupné na tejto adrese spolu s dátumom poslednej aktualizácie.",
          en: "The provider may amend these terms. An order that has already been confirmed is always governed by the version in force on the day of its confirmation. The current version is available at this address together with the date of the last update.",
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------
   Zásady používania cookies
------------------------------------------------------------------------- */

export const cookiePolicy: LegalDocument = {
  id: "cookies",
  lead: {
    sk: "Tento web nesleduje svojich návštevníkov. Nepoužíva analytické ani marketingové cookies, a preto nezobrazuje ani cookie lištu: nie je čo odsúhlasovať.",
    en: "This website does not track its visitors. It uses no analytics or marketing cookies, and therefore shows no cookie banner: there is nothing to consent to.",
  },
  sections: [
    {
      heading: { sk: "Čo sú cookies", en: "What cookies are" },
      paragraphs: [
        {
          sk: "Cookies sú malé textové súbory, ktoré si web ukladá vo vašom prehliadači. Slúžia napríklad na zapamätanie prihlásenia, na uchovanie nastavenia jazyka alebo na meranie návštevnosti.",
          en: "Cookies are small text files that a website stores in your browser. They are used, for example, to remember a login, keep a language preference or measure traffic.",
        },
        {
          sk: "Podobne fungujú aj ďalšie technológie lokálneho úložiska prehliadača, napríklad localStorage a sessionStorage. Aj na ne sa vzťahuje všetko, čo je uvedené nižšie.",
          en: "Other browser storage technologies such as localStorage and sessionStorage work in a similar way. Everything stated below applies to them as well.",
        },
      ],
    },
    {
      heading: { sk: "Aké cookies používa tento web", en: "What cookies this site uses" },
      paragraphs: [
        {
          sk: "Tento web nepoužíva analytické cookies. Nemáme nasadený Google Analytics ani iný merací nástroj, takže nezbierame štatistiky o návštevnosti, o zdrojoch návštev ani o tom, ako sa po stránke pohybujete.",
          en: "This site uses no analytics cookies. We have not deployed Google Analytics or any other measurement tool, so we collect no traffic statistics, no data about referral sources and no record of how you move around the page.",
        },
        {
          sk: "Tento web nepoužíva marketingové ani reklamné cookies. Nespúšťame remarketing, nemáme pixel žiadnej reklamnej siete a nesledujeme vás naprieč inými webmi.",
          en: "This site uses no marketing or advertising cookies. We run no remarketing, we have no advertising network pixel and we do not follow you across other websites.",
        },
        {
          sk: "Keďže sa tu nespracúvajú žiadne cookies vyžadujúce súhlas, web nezobrazuje cookie lištu. Súhlasné okno, ktoré nemá čo povoliť ani zamietnuť, by bolo len zbytočnou prekážkou pri čítaní stránky.",
          en: "Since no cookies requiring consent are processed here, the site shows no cookie banner. A consent dialog with nothing to allow or refuse would only be a pointless obstacle to reading the page.",
        },
      ],
    },
    {
      heading: { sk: "Technicky nevyhnutné úložisko", en: "Strictly necessary storage" },
      paragraphs: [
        {
          sk: "Web môže použiť technicky nevyhnutné úložisko len tam, kde je to potrebné pre základnú funkčnosť, ktorú ste sami vyvolali. Ide najmä o spracovanie odoslaného formulára a o ochranu formulárov pred zneužitím a automatizovaným odosielaním.",
          en: "The site may use strictly necessary storage only where this is needed for basic functionality that you yourself triggered. This concerns primarily the processing of a submitted form and the protection of the forms against abuse and automated submissions.",
        },
        {
          sk: "Takéto úložisko je krátkodobé, neobsahuje identifikátor určený na sledovanie a nepoužíva sa na profilovanie. Podľa predpisov o elektronických komunikáciách si nevyžaduje súhlas, pretože je nevyhnutné na poskytnutie služby, o ktorú ste výslovne požiadali.",
          en: "Such storage is short lived, contains no tracking identifier and is not used for profiling. Under electronic communications legislation it requires no consent, because it is strictly necessary to provide a service you have explicitly requested.",
        },
        {
          sk: "Poskytovateľ hostingu spracúva bežné serverové záznamy o požiadavkách, napríklad IP adresu a typ prehliadača, na účel prevádzky a bezpečnosti webu. Nejde o cookies a tieto záznamy nepoužívame na analytiku ani na vytváranie profilov.",
          en: "The hosting provider processes ordinary server request logs, such as IP address and browser type, for the operation and security of the site. These are not cookies and we do not use those logs for analytics or profiling.",
        },
      ],
    },
    {
      heading: { sk: "Cookies tretích strán", en: "Third party cookies" },
      paragraphs: [
        {
          sk: "Web nemá žiadne cookies tretích strán. Neobsahuje vložené videá z YouTube ani Vimeo, vloženú mapu, tlačidlá sociálnych sietí, chatovacie okno ani iný externý obsah, ktorý by na pozadí načítaval cudzie skripty.",
          en: "The site has no third party cookies. It contains no embedded YouTube or Vimeo videos, no embedded map, no social network buttons, no chat widget and no other external content that would load foreign scripts in the background.",
        },
        {
          sk: "Písma sú uložené priamo na tomto webe a nenačítavajú sa zo služby Google Fonts. Pri otvorení stránky sa preto kvôli písmam neodosiela žiadna požiadavka na server tretej strany.",
          en: "Fonts are hosted on this site itself and are not loaded from Google Fonts. Opening a page therefore sends no request to any third party server for fonts.",
        },
        {
          sk: "Odkazy na profily na sociálnych sieťach vedú na externé weby. Ak taký odkaz otvoríte, platia už podmienky a cookies príslušnej siete, nie tieto zásady.",
          en: "Links to social network profiles lead to external sites. Once you open such a link, the terms and cookies of that network apply, not this policy.",
        },
      ],
    },
    {
      heading: {
        sk: "Ako si spravovať cookies v prehliadači",
        en: "How to manage cookies in your browser",
      },
      paragraphs: [
        {
          sk: "Aj keď tento web nič sledovacie neukladá, kontrolu nad úložiskom máte vždy vo svojom prehliadači. V nastaveniach súkromia môžete cookies zablokovať, obmedziť ich na cookies prvej strany alebo ich kedykoľvek vymazať.",
          en: "Even though this site stores nothing that tracks you, control over browser storage always remains with you. In your privacy settings you can block cookies, restrict them to first party cookies or delete them at any time.",
        },
        {
          sk: "V prehliadačoch Chrome, Edge, Firefox aj Safari nájdete tieto možnosti v nastaveniach v sekcii Súkromie a bezpečnosť. Pomáha aj používanie okna v režime súkromného prehliadania, ktoré úložisko po zatvorení vymaže.",
          en: "In Chrome, Edge, Firefox and Safari these options are found in settings under Privacy and security. Using a private browsing window also helps, as it clears the storage once the window is closed.",
        },
        {
          sk: "Blokovanie cookies môže na iných weboch obmedziť funkčnosť, napríklad prihlasovanie alebo nákupný košík. Na tomto webe zostane všetko funkčné aj pri úplnom zablokovaní cookies.",
          en: "Blocking cookies may limit functionality on other websites, for example sign in or a shopping cart. On this site everything keeps working even with cookies fully blocked.",
        },
      ],
    },
    {
      heading: {
        sk: "Ak by sme v budúcnosti pridali analytiku",
        en: "If we add analytics in the future",
      },
      paragraphs: [
        {
          sk: "Ak by sme sa niekedy rozhodli merať návštevnosť alebo použiť reklamný nástroj, tieto zásady najprv aktualizujeme a doplníme konkrétny zoznam cookies, ich účel, dobu platnosti a prevádzkovateľa daného nástroja.",
          en: "If we ever decide to measure traffic or use an advertising tool, we will first update this policy and add a specific list of cookies, their purpose, their lifetime and the operator of the tool concerned.",
        },
        {
          sk: "Zároveň by sme zaviedli súhlasný mechanizmus: skripty vyžadujúce súhlas by sa načítali až po vašom aktívnom potvrdení, odmietnutie by bolo rovnako jednoduché ako súhlas a raz udelený súhlas by sa dal kedykoľvek zmeniť alebo odvolať.",
          en: "We would also introduce a consent mechanism: scripts requiring consent would load only after your active confirmation, refusing would be as easy as agreeing, and any consent given could be changed or withdrawn at any time.",
        },
        {
          sk: "Do takej zmeny platí to, čo je uvedené vyššie: web nesleduje návštevníkov a nepotrebuje od vás žiadny súhlas s cookies.",
          en: "Until such a change, what is stated above applies: the site does not track visitors and needs no cookie consent from you.",
        },
      ],
    },
    {
      heading: { sk: "Zmeny týchto zásad", en: "Changes to this policy" },
      paragraphs: [
        {
          sk: "Zásady aktualizujeme, ak sa zmení technické riešenie webu alebo použité nástroje. Aktuálne znenie s dátumom poslednej aktualizácie je vždy dostupné na tejto adrese.",
          en: "We update this policy if the technical setup of the site or the tools used change. The current version, together with the date of the last update, is always available at this address.",
        },
      ],
    },
  ],
};
