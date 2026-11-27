# ROKARO — održavanje cjenika i pravnih podstranica

**Status isporuke 26. 11. 2026.: RAZVOJNA VERZIJA. Ne objavljivati na produkciju dok kontrolni popis nije dovršen.**

Ovaj dokument služi vlasniku web-stranice. Nije pravni savjet ni zamjena za potvrdu stvarnih poslovnih podataka.

## 1. Što je već pripremljeno

- `cjenik/index.html`: javno čitljiv cjenik predviđenih kratkih vožnji, informacija o individualno ugovorenim događanjima, poveznica na CSV i opis arhive.
- `cjenici/aktualni.csv`: UTF-8 CSV s razdjelnikom `;`, izrađen prema 4 stupca službenog predloška Hrvatske obrtničke komore za USLUGE od 17. 11. 2026.
- `cjenici/arhiva/`: mjesto za stare verzije; nema izmišljenih arhivskih cjenika.
- `podaci-o-obrtu/`, `pisani-prigovori/`, `privatnost/`: pravne podstranice.
- Glavna stranica ima četiri nove poveznice u footeru. Svaka izravno otvara odgovarajući `index.html`, tako da funkcionira i pri dvokliku na lokalnu datoteku. Postojeći dizajn, kontakt, galerija, video i tekstovi nisu mijenjani.

Trenutačnih 3,00 / 5,00 / 8,00 € i jednakih baznih cijena **nisu potvrđeni**. U `cjenik/index.html` vidljivo piše da je riječ o radnoj verziji. Ne uklanjati tu oznaku dok vlasnik ne potvrdi vrijednosti.

## 2. Što vlasnik mora potvrditi prije objave

1. Puni registrirani naziv obrta, ime vlasnika, sjedište/adresa, OIB, registracijsko tijelo i eventualni PDV ID. **MBO = 99192063**, **nije u sustavu PDV-a** (vlasnik potvrdio 26. 11. 2026.).
2. Prodaju li se javne vožnje od 5, 10 i 15 minuta doista po 3,00 €, 5,00 € i 8,00 € te jesu li to stvarne redovne cijene pri **prvom stavljanju svake usluge u ponudu** nakon 10. 9. 2026. Ako je na prvi datum postojao popust, primijeniti posebno pravilo čl. 3. st. 5. Pravilnika o baznim cijenama.
3. Stvarni datum početka primjene aktualnog cjenika; podatak se ne može odrediti iz datuma izrade ovog projekta.
4. Primjenjuje li se jedan cjenik na **svim** mobilnim prodajnim mjestima ili se cijene razlikuju po manifestacijama. Ako se razlikuju, potrebne su zasebne datoteke po prodajnom mjestu.
5. Jesu li standardizirane i druge usluge namijenjene potrošačima (npr. standardna usluga rođendana po fiksnoj cijeni). Ako jesu, procijeniti ulaze li u cjenik. Personalizirane B2B ponude ne treba automatski izjednačiti s javnim cjenikom.
6. Gdje će stranica biti hostana; podržava li hosting vlastite HTTP response-headere, osobito `Content-Disposition`; te kakvi se poslužiteljski logovi, kolačići, vanjski servisi i prijenosi podataka koriste.
7. Stvarne primatelje/izvršitelje obrade podataka, zaštitne mjere za eventualne prijenose izvan EGP-a, trajanje čuvanja podataka i pravne osnove za upite/ponude. Potvrditi je li potreban službenik za zaštitu podataka.
8. Je li postupak zaprimanja pisanih prigovora **osobno na terenu**, poštom i e-mailom operativno uspostavljen. Obavijest istaknuti i na samom prodajnom mjestu.

## 3. Kako promijeniti cijene — bez promjene bazne cijene

**Prvo:** prije početka primjene novih cijena pohraniti kopiju **prethodnog objavljenog CSV-a** u `cjenici/arhiva/`. Koristiti njegov izvorni propisani naziv (iz prethodne objave), bez izmišljanja datuma ili povijesti. U arhivi mora ostati javno dostupan barem 15 dana od zamjene. Trenutačno je arhiva prazna jer raniji dokumenti nisu dostavljeni.

**Drugo:** ručno promijeniti vrijednosti u redcima `cjenici/aktualni.csv`. Zatim iste maloprodajne vrijednosti promijeniti u tablici `cjenik/index.html`. Bazne cijene u oba mjesta **ostaju iste** osim ako za samu novu uslugu ili poseban zakonski slučaj postoji osnova za novu baznu cijenu.

**Treće:** provjeriti je li za promjenu cijene aktiviran poseban oblik prodaje. U CSV stupac `Poseban oblik prodaje usluga (DA/NE)` upisati ispravno `DA` ili `NE`; izmijeniti odnosne oznake u HTML-u ako je potrebno. Bazna cijena sama po sebi nije reklamirani popust.

**Četvrto:** ažurirati stvarni datum primjene u `cjenik/index.html`. Zamijeniti sadržaj `cjenici/aktualni.csv` na **istoj javnoj URL adresi**, ne stvarati novu adresu umjesto stare. Po potrebi dodati poveznicu na arhivsku verziju u sekciju »Arhiva prethodnih cjenika« (i ukloniti tekst o praznoj arhivi).

**Peto:** novi cjenik objaviti **najkasnije do 11:00 sati na dan promjene**. Nakon objave provjeriti izravni HTTP zahtjev i da HTML, CSV te stvarne cijene na terenu odgovaraju jedni drugima.

## 4. Kako dodati novu uslugu

1. Evidentirati naziv, stvarni datum **prvog stavljanja u ponudu**, redovnu maloprodajnu cijenu tog dana i primjenu eventualnog popusta.
2. Na temelju čl. 3. NN 132/2026 utvrditi baznu cijenu; ne izjednačavati je automatski s novom maloprodajnom cijenom.
3. Dodati redak u CSV s istim rasporedom 4 stupca i redak u HTML tablicu.
4. Ažurirati datoteku s propisanim imenom, arhivu i stvarne terenske cjenike, prema koracima 3.

## 5. Propisano ime datoteke i stabilna URL adresa — preostali hosting zadatak

Članak 6. stavci 2.–4. Pravilnika o načinu objave cjenika (NN 132/2026) zahtijeva istu URL adresu kod zamjene cjenika **i propisane elemente u nazivu datoteke**.

Za **jedinstveni cjenik** svim prodajnim mjestima, HOK daje preporučeni obrazac:

```text
99192063_ZA_SVA_PRODAJNA_MJESTA_USLUGE_0001_[GGGGMMDD_SSMM].csv
```

Za različite cjenike po prodajnim mjestima potrebni su dodatni podaci u imenu (vrsta, adresa i oznaka mjesta). Primjer obrasca iz HOK-ovih uputa nije doslovno propisana sintaksa podvlaka; svi elementi moraju biti sadržani.

**MBO 99192063 i činjenica da je ovo prvi cjenik potvrđeni su; broj pohrane `0001` predložen je kao prvi interni redni broj. Stvarni datum/vrijeme objave još nisu poznati.** Zato ova razvojna verzija sadrži isključivo `cjenici/aktualni.csv` kao stabilni radni endpoint. Ona još **nema zakonski dovršeno ime datoteke**. Ako se prvi cjenik objavi 26. 11. 2026., zadnji dio naziva bit će `20261126_SSMM`, ali samo uz stvarni sat i minutu objave (lokalno vrijeme Europe/Zagreb).

Potvrde vlasnika 26. 11. 2026.: domena postoji (naziv i hosting nisu dostavljeni); nije u sustavu PDV-a; ovo je prvi cjenik; e-mail `rokaro.info@gmail.com` i poštanska adresa sjedišta prihvatljivi su za prigovore; izvorne fotografije pripadaju vlasniku. Još potvrditi prava na eventualno ugrađene tuđe elemente, glazbu i prikaze stvarnih prepoznatljivih osoba, posebno djece.

Za produkciju izraditi datoteku s **pravim** propisanim imenom i istim sadržajem. Nakon odabira hostinga:

- Izravna, nepromjenjiva javna URL adresa: `/cjenici/aktualni.csv`.
- Po mogućnosti HTTP zaglavlje `Content-Disposition: attachment; filename="STVARNI_MBO_...csv"` kada se dohvaća ta URL adresa. Ova postavka ovisi o hostingu i mora se testirati.
- Dodatna dostupnost verzionirane datoteke na javnoj adresi s propisanim imenom, ako je potrebna za transparentno arhiviranje; sadržaj mora biti jednak.
- Statika bez podrške za prilagođena HTTP zaglavlja **ne jamči** usklađivanje propisanog imena sa stabilnom URL adresom samo atributom HTML poveznice `download`. U tom slučaju konfigurirati pravila hostinga ili odabrati hosting koji ih podržava; ne uvoditi backend samo zbog toga.
- CSV mora se vraćati bez prijave, CAPTCHA-e ili JS-a, kao UTF-8 s razdjelnikom `;`, s primjerenim `Content-Type`.

## 6. Provjera nakon objave

- Otvoriti `/cjenik/index.html` na desktopu i mobitelu, pa provjeriti i otvaranje svih poveznica lokalno bez servera.
- Otvoriti sve 4 poveznice u footeru, uključujući staru adresu `/privatnost.html` koja preusmjerava na novu.
- Usporediti svaku cijenu HTML-a, CSV-a i cjenika na prodajnom mjestu.
- Provjeriti točan sadržaj HTTP odgovora na `/cjenici/aktualni.csv` i `Content-Disposition` (ako se koristi) naredbom `curl -I` i `curl`.
- Provjeriti oznaku cijena u CSV-u, datum početka primjene i obvezni naziv datoteke.
- Provjeriti dostupnost stvarnih arhivskih cjenika najmanje 15 dana.
- Ukloniti radne oznake i polja `[UNIJETI]`, `[POTVRDITI]`, `[PROVJERITI]` **tek nakon što su stvarni podaci potvrđeni**.
- Iz podstranica ukloniti privremeni `noindex` ako želite njihovo indeksiranje u tražilicama.
- Ako se dodaju analitika, vanjski playeri ili kolačići koji traže privolu, prije aktivacije postaviti ispravno upravljanje privolom i ažurirati politiku privatnosti.
- Kod ugovora s potrošačima koji se sklapaju na daljinu/izvan prostorija zasebno provjeriti predugovorne informacije i moguću iznimku za usluge slobodnog vremena vezane uz određeni datum.
- Prije uporabe fotografija ili videa s prepoznatljivom djecom potvrditi stvarnu pravnu osnovu (osobito odgovarajuće privole roditelja kada se oslanjate na privolu), prava autora i dopuštenu marketinšku svrhu. Za AI-generirane vizuale provjeriti smiju li se koristiti komercijalno i ne predstavljati ih kao fotografije održanih događanja.

## 7. Izvori korišteni 26. 11. 2026.

- [NN 132/2026 — Pravilnik o isticanju bazne cijene proizvoda](https://narodne-novine.nn.hr/clanci/sluzbeni/2026_11_132_1583.html), osobito čl. 3., 4., 6. i 7.
- [NN 132/2026 — Pravilnik o načinu objave cjenika proizvoda](https://narodne-novine.nn.hr/clanci/sluzbeni/full/2026_11_132_1584.html), osobito čl. 3.–6.
- [HOK — Upute i službeni predložak cjenika usluga, 17. 11. 2026.](https://www.hok.hr/novosti-iz-hok/upute-za-isticanje-baznih-cijena-i-objavu-cjenika).
- [Zakon o zaštiti potrošača, čl. 10.](https://narodne-novine.nn.hr/clanci/sluzbeni/full/2022_02_19_203.html) i [izmjene NN 59/2026](https://narodne-novine.nn.hr/clanci/sluzbeni/2026_06_59_728.html).
- [Zakon o elektroničkoj trgovini, čl. 6.](https://narodne-novine.nn.hr/clanci/sluzbeni/full/2003_10_173_2504.html).
- [AZOP — informacije prema člancima 12.–14. GDPR-a](https://azop.hr/informiranje-ispitanika-o-obradi-njegovih-osobnih-podataka-politika-privatnosti/).
- [AZOP — objava videozapisa djece i dijeljenje sadržaja na internetu](https://azop.hr/objava-videozapisa-djece-i-dijeljenje-sadrzaja-na-internetu-i-drustvenim-mrezama/).

**Odgovorna osoba za dovršetak:** vlasnik ROKARO-a, prije sljedeće javne objave. Nakon unosa točnih podataka potreban je završni tehnički i pravni pregled.
