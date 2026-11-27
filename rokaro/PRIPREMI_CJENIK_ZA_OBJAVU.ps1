# ROKARO: pokrenite iz PowerShella neposredno prije slanja stranice na hosting.
# Ažurira naziv CSV datoteke, poveznicu za preuzimanje i datum na stranici.
# NE objavljuje datoteke na internetu i NE jamči da je vrijeme slanja jednako vremenu pripreme.

param(
    [ValidatePattern('^\d{8}_\d{4}$')]
    [string]$OznakaVremena
)

$ErrorActionPreference = 'Stop'
$korijen = $PSScriptRoot
$mapaCjenika = Join-Path $korijen 'cjenici'
$htmlPutanja = Join-Path (Join-Path $korijen 'cjenik') 'index.html'
$obrazac = '^99192063_ZA_SVA_PRODAJNA_MJESTA_USLUGE_0001_\d{8}_\d{4}\.csv$'

$datoteke = @(Get-ChildItem -LiteralPath $mapaCjenika -File -Filter '*.csv' |
    Where-Object { $_.Name -match $obrazac })

if ($datoteke.Count -ne 1) {
    throw 'Očekivana je točno jedna ROKARO CSV datoteka s postojećim propisanim nazivom.'
}

if (-not $OznakaVremena) {
    try {
        $zona = [TimeZoneInfo]::FindSystemTimeZoneById('Central European Standard Time')
    } catch {
        $zona = [TimeZoneInfo]::FindSystemTimeZoneById('Europe/Zagreb')
    }
    $lokalno = [TimeZoneInfo]::ConvertTimeFromUtc([DateTime]::UtcNow, $zona)
    $OznakaVremena = $lokalno.ToString('yyyyMMdd_HHmm')
}

$stariNaziv = $datoteke[0].Name
$noviNaziv = '99192063_ZA_SVA_PRODAJNA_MJESTA_USLUGE_0001_' + $OznakaVremena + '.csv'
$html = [IO.File]::ReadAllText($htmlPutanja, [Text.Encoding]::UTF8)

if (-not $html.Contains($stariNaziv)) {
    throw 'Poveznica na postojeći CSV nije pronađena u cjenik/index.html. Provjerite je prije objave.'
}
if (-not $html.Contains('id="cjenik-datum"')) {
    throw 'Datum cjenika nije pronađen u cjenik/index.html. Provjerite ga prije objave.'
}

$noviPut = Join-Path $mapaCjenika $noviNaziv
if ($stariNaziv -ne $noviNaziv) {
    if (Test-Path -LiteralPath $noviPut) {
        throw 'Ciljna CSV datoteka već postoji. Nije napravljena nikakva promjena.'
    }
    Rename-Item -LiteralPath $datoteke[0].FullName -NewName $noviNaziv
}

$utf8BezBom = New-Object System.Text.UTF8Encoding($false)
$datum = [DateTime]::ParseExact($OznakaVremena, 'yyyyMMdd_HHmm', [Globalization.CultureInfo]::InvariantCulture)
$datumHr = $datum.ToString('d. MMMM yyyy.', [Globalization.CultureInfo]::GetCultureInfo('hr-HR'))
$html = $html.Replace($stariNaziv, $noviNaziv)
$html = [regex]::Replace($html, '<span id="cjenik-datum">[^<]*</span>', '<span id="cjenik-datum">' + $datumHr + '</span>')
[IO.File]::WriteAllText($htmlPutanja, $html, $utf8BezBom)

Write-Host "Naziv CSV datoteke i poveznica usklađeni: $noviNaziv"
Write-Host 'VAŽNO: odmah nakon ovoga objavite datoteku; ako se vrijeme objave promijeni, ponovite postupak.'
Write-Host 'VAŽNO: obveza iste URL adrese pri kasnijoj zamjeni ovisi o konfiguraciji hostinga.'
