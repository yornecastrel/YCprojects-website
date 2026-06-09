YC Projects – Statische demo website

Overzicht

Deze map bevat een statische, premium demo-website voor YC Projects (terrassen, poolhouses, tuinafschermingen, tuinrenovaties).

Hoe lokaal bekijken

1. Open de map in uw bestandsbeheerder.
2. Open `index.html` in een moderne browser (Chrome, Edge, Firefox).

Opmerkingen voor vervanging van afbeeldingen

- Afbeeldingen gebruiken momenteel Unsplash-URL's als tijdelijke high-quality placeholders.
- Vervang `src` in de `img`-tags of sla lokale afbeeldingen op in `assets/` en update paden.

Contactformulier

- Het formulier werkt client-side: invullingen worden opgeslagen in `localStorage` als `yc_submissions`.
- Voor e-mailintegratie: maak een server-endpoint (bijv. `/api/contact`) dat POST-verzoeken accepteert en stuurt naar e-mail of CRM.

Bestanden

- `index.html`, `diensten.html`, `referenties.html`, `contact.html` — HTML-pagina's
- `styles.css` — originele basis-styles
- `premium.css` — nieuwe premium styling en animaties (geladen bovenop `styles.css`)
- `script.js` — mobiele nav, reveal animaties, formulierhandeling

Vervolgstappen (optioneel)

- Voeg een server-side endpoint toe voor e-mail (Node/PHP/Python) en update `script.js` om te POSTen.
- Optimaliseer afbeeldingen door ze lokaal te hosten en te comprimeren.
- Voeg tracking en conversie metingen toe (Google Analytics, Facebook Pixel).

