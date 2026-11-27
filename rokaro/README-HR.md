# ROKARO V9.3 — video na naslovnici i galerija bez natpisa

Web stranica je na hrvatskom jeziku. Kontakt je izravan: e-mail `rokaro.info@gmail.com` i telefon `092 343 1924`. Nema obrasca ni FormSubmita.

## 1. Kako dodati nove fotografije (2 kratka koraka)

1. Kopirajte novu fotografiju (`.jpg`, `.png` ili `.webp`) u mapu **`assets`** pokraj postojećih fotografija. Preporuka: jednostavan naziv bez razmaka, npr. `moj-novi-teren.jpg`.
2. Otvorite **`galerija.js`** u Notepadu ili VS Codeu. U popisu dodajte jedan novi red s točnim nazivom datoteke:

   ```js
   "assets/moj-novi-teren.jpg",
   ```

Spremite `galerija.js` i osvježite stranicu. **Ne morate uređivati `index.html` ni `script.js`.**

- Za promjenu redoslijeda premjestite redak više ili niže u popisu.
- Za uklanjanje fotografije izbrišite njezin redak.
- Prva fotografija u popisu prikazuje se najveća.
- Prvih šest vidljivo je odmah; sedma i sve ostale prikazuju se na klik **Prikaži sve fotografije**.
- Galerija prikazuje samo fotografije, bez naziva, kategorija i opisa. Klik otvara sliku u velikom pregledu s tipkama lijevo/desno.

**Pazite:** zadržite navodnike i zarez na kraju retka. Ako se fotografija ne pojavi, prvo provjerite je li naziv u popisu potpuno isti kao naziv datoteke.

## 2. Kako dodati video — bez uređivanja koda

1. Pripremite video u formatu **MP4 (H.264)**, horizontalno, najbolje 16:9.
2. Nazovite ga točno **`rokaro-video.mp4`**.
3. Kopirajte ga u mapu **`assets`** uz postojeće slike. Gotovo.

Na vrhu stranice video će se automatski učitavati i, gdje preglednik to dopušta, pokretati **bez zvuka i u petlji**. Posjetitelj može uključiti zvuk i pauzirati video. Ako video nedostaje, prikazuje se velika naslovna fotografija i mali tekst **VIDEO U PRIPREMI**, bez pokvarenog playera.

Za dobar prvi dojam preporuka je video 15–30 sekundi s vidljivim vožnjama, stvarnom arenom i kadrovima sudionika kada ih budete imali. Video treba optimizirati za brzo učitavanje na mobitelima.

## 3. Kako pregledati stranicu

Raspakirajte ZIP i dvokliknite `index.html`. Za običan pregled nije potreban server. Nakon dodavanja fotografije ili videa samo osvježite stranicu (ponekad `Ctrl + F5`).

## 4. Prije javne objave

- Zakonske podstranice otvaraju se izravno na `cjenik/index.html`, `podaci-o-obrtu/index.html`, `pisani-prigovori/index.html` i `privatnost/index.html`. Poveznice rade i kada lokalno dvokliknete glavnu stranicu bez servera. Stara `privatnost.html` preusmjerava na novu adresu.
- Prije javne objave obavezno pročitajte `README_CJENIK.md` i potvrdite sve navedene cijene, registracijske i privatnosne podatke. Zakonski dio je trenutačno **radna verzija**, a ne objavljena pravna usklađenost.
- Provjerite `mailto:` i `tel:` poveznice na mobitelu.
- Ne predstavljajte vizuale s montiranim ambijentom ili sudionicima kao dokumentaciju već održanih događanja; nakon prvih eventa zamijenite ih stvarnim fotografijama i snimkama.
- Postavite apsolutni URL za Open Graph sliku kada bude poznata domena.

## Struktura za samostalno održavanje

```text
index.html                  glavna stranica
styles.css                  dizajn
script.js                   funkcionalnost galerije i videa
galerija.js                 JEDINA DATOTEKA ZA DODAVANJE SLIKA
assets/
  rokaro-video.mp4          OVDJE KOPIRAJTE VIDEO (trenutačno ne postoji)
  moja-fotografija.jpg      OVDJE DODAJTE NOVE FOTOGRAFIJE
privatnost.html             radna izjava o privatnosti
dokumenti/                  B2B prezentacija
```
