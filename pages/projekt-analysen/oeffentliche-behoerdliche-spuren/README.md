# Projektanalyse – Öffentliche & behördliche Spuren

Stand: 22.08.2026

## Rolle innerhalb der großen Projektanalyse

Dieser Ordner ist **kein eigenständiges Endkunden-Frühwarnsystem**. Er ist ein interner Analysebaustein der großen Projektanalyse der Akademie für finanzielle Souveränität.

Er sammelt und normalisiert öffentlich überprüfbare Spuren zu einem Projekt bzw. Rechtsträger und ergänzt damit die bestehende 16-Fragen-Projektanalyse.

## Automatisch/strukturiert angebundene Quellen

- BaFin-Verbraucherwarnungen und Maßnahmenhinweise
- ESMA MiCA CASP / Non-Compliant Entities
- EBA PSD2 / E-Geld- und Zahlungsinstitute
- EBA Kreditinstitute
- GLEIF / LEI-Identitätsspur
- CFTC RED List (USA)
- FCA-Warnlisten-Importer als Ausbauquelle
- manuell bestätigte öffentliche Spuren über `public-traces.json`

## Verwendung in der Projektanalyse

Der Baustein liefert Roh- und Quellenfakten für die große Projektanalyse, insbesondere zu:

1. Rechtsträger / Identität
2. Aufsicht / Zulassung / MiCA
3. Warn- und Maßnahmenhinweise
4. öffentlich bestätigte juristische Spuren
5. wirtschaftliche Statusspuren
6. öffentlich erkennbare Werbe- und Vertriebsspuren

Die Ergebnisse werden **nicht** als pauschales Urteil „seriös/unseriös“ verstanden. Sie werden innerhalb der Projektanalyse mit Geschäftsmodell, Geldfluss, Token-/Produktlogik, Vertriebsstruktur, Risikoindikatoren und den übrigen 16 Prüffragen zusammengeführt.

## Wichtige Erkenntnis aus dem Frühwarn-Prototyp

Behördenwarnungen sind zeitlich häufig nachgelagert. Die große Projektanalyse muss deshalb zusätzlich die öffentlichen Projekt-, Marketing-, Nutzer- und Geschäftsmodellspuren auswerten. Der vorliegende Quellenmotor ergänzt diese Analyse um die offizielle/behördliche Ebene; er ersetzt sie nicht.

## Herkunft

Technischer Stand des bisherigen `lb-tools/pages/projekt-fruehwarn-check/`, migriert am 22.08.2026 und als Projektanalyse-Baustein neu eingeordnet. Diagnose- und einmalige Reparaturdateien wurden bewusst nicht übernommen.
