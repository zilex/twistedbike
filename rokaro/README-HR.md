# ROKARO — produkcijska verzija landing stranice

## Gdje ide stranica

Sadržaj ove mape postavite u `rokaro/` unutar GitHub repozitorija `zilex/twistedbike`, tako da je početna datoteka `rokaro/index.html`. Glavna adresa je `https://twistedbike.hr/rokaro/`.

Nemojte stvoriti dodatnu ugniježđenu mapu `ROKARO_Landing_...` jer bi se stranica tada otvarala na pogrešnoj adresi.

## Video

U paketu su dvije optimizirane H.264 MP4 datoteke, obje **bez audiozapisa**: `assets/rokaro-video-mobile.mp4` za mobitele i `assets/rokaro-video-desktop.mp4` za veće zaslone. Video nema izvorne kontrole ni kontrole zvuka. Pokreće se automatski i vrti u petlji kada to preglednik dopušta. Ako autoplay bude blokiran (npr. štednja podataka ili energije), odmah je dostupan gumb **Pokreni**. Ako se video ne može učitati, ostaje fotografija `assets/rokaro-video-poster.webp`.

Za zamjenu videa izvezite dvije nijeme H.264 MP4 verzije (16:9, `yuv420p`, `faststart`) i zamijenite upravo te dvije datoteke u `assets/`. Sliku prvog kadra možete zamijeniti zasebno u `rokaro-video-poster.webp`.

## Galerija — najjednostavnije dodavanje fotografija

1. Dodajte novu `.jpg`, `.png` ili `.webp` datoteku u `assets/`.
2. Otvorite `galerija.js`.
3. Dodajte novi red u popis, primjerice `"assets/nova-fotografija.jpg",`.
4. Spremite i objavite izmjene.

Redoslijed fotografija mijenja se redoslijedom redaka. Na stranici se ne ispisuju imena datoteka ni opisi slika.

## Cjenik

Javni cjenik je u `cjenik/index.html`, a pripadajući CSV u `cjenici/`.

- Cijene na HTML stranici i u CSV-u moraju odgovarati stvarnim važećim cijenama na mjestu pružanja usluge. **Prije objave potvrdite javne pojedinačne vožnje 5/10/15 minuta (3/5/8 €): te stavke nisu navedene u centralnom ROKARO cjeniku, u kojem su paketi rođendana i poslovnih događanja.**
- Preuzeti CSV ima propisne elemente naziva: MBO, oznaku prodajnih mjesta, `USLUGE`, redni broj i datum/vrijeme.
- Neposredno prije svake nove javne objave izvršite `PRIPREMI_CJENIK_ZA_OBJAVU.ps1` u Windows PowerShellu. Skripta ažurira naziv CSV-a, poveznicu, atribut za preuzimanje i prikazani datum cjenika. Ne objavljuje datoteke.
- Oznaku `ZA_SVA_PRODAJNA_MJESTA` koristite samo ako je isti cjenik primjenjiv na svim relevantnim prodajnim mjestima. Za različite cjenike potrebna je druga organizacija datoteka.
- Pri promjeni cjenika prethodnu verziju sačuvajte u `cjenici/arhiva/` i osigurajte pristup najmanje 15 dana.

GitHub Pages je statički hosting: promjena propisnog naziva CSV datoteke mijenja i njezinu izravnu URL adresu. Dugoročno rješenje zahtjeva iste URL adrese pri zamjeni potrebno je odvojeno uskladiti s načinom posluživanja CSV-a.

## Kontrola nakon objave

Otvorite početnu stranicu i svaku pravnu podstranicu (`cjenik/`, `podaci-o-obrtu/`, `pisani-prigovori/`, `privatnost/`). Provjerite video i fotografije na mobitelu te preuzmite CSV i usporedite ime datoteke s nazivom na poslužitelju. Potvrdite i da su podaci obrta, postupak zaprimanja prigovora i politika privatnosti točni u stvarnoj operativi.
