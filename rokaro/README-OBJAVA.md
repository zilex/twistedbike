# ROKARO — postupak produkcijske objave

**Domena i hosting:** `https://twistedbike.hr/rokaro/` — GitHub Pages, repozitorij `zilex/twistedbike`, grana `main`.

## Raspored datoteka

Struktura repozitorija mora izgledati ovako:

```text
twistedbike/
  rokaro/
    index.html
    styles.css
    script.js
    galerija.js
    assets/
    cjenik/index.html
    podaci-o-obrtu/index.html
    pisani-prigovori/index.html
    privatnost/index.html
    cjenici/99192063_ZA_SVA_PRODAJNA_MJESTA_USLUGE_0001_YYYYMMDD_HHMM.csv
```

Nemojte prenijeti cijelu raspakiranu vanjsku mapu kao podmapu unutar `rokaro` jer bi početna stranica završila na krivoj adresi.

## Prije uploadanja

1. Provjeriti stvarne maloprodajne i bazne cijene, registracijske podatke obrta i sadržaj politike privatnosti. Podaci o obrtu preuzeti su s javne stranice TwistedBike i trebaju odgovarati službenom izvatku.
2. Potvrditi primjenjuje li se isti cjenik na svim događanjima. Oznaka `ZA_SVA_PRODAJNA_MJESTA` smije se koristiti samo uz taj uvjet.
3. Pokrenuti `PRIPREMI_CJENIK_ZA_OBJAVU.ps1` neposredno prije objave, kako bi vremenska oznaka imena CSV-a odgovarala stvarnom trenutku. Skripta ne šalje datoteke na internet.
4. Ovisno o hostingu, riješiti obveznu istu URL adresu CSV-a pri budućoj zamjeni, uz datoteku s propisanim nazivom. To se ne može jamčiti samim statičkim HTML-om.
5. Prenijeti obje datoteke `assets/rokaro-video-mobile.mp4` i `assets/rokaro-video-desktop.mp4` te poster `assets/rokaro-video-poster.webp`. Nemojte vratiti stari video s audiozapisom.

## Nakon uploadanja

- Otvoriti `https://www.twistedbike.hr/rokaro/index.html` i sve četiri pravne podstranice.
- Testirati klik za CSV i provjeriti stvarno preuzeto ime datoteke, broj stupaca i vrijednosti.
- Provjeriti da nema pogrešaka `404` za slike, fontove, prezentaciju ili video.
- Provjeriti redirekciju između `http`, `https`, `www` i domene bez `www`.
- Provjeriti podatke i arhivu cjenika, obavijest o prigovorima te podatke na prodajnom mjestu.

Stranica se ne objavljuje automatski ovim paketom.
