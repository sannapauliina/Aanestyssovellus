# Äänestyssovelluksen käyttötapauskuvaukset

---

## Käyttötapaus: Selaa äänestyksiä

**Käyttäjät:** Tavallinen käyttäjä  
**Laukaisija:** Käyttäjä avaa sovelluksen etusivun ja valitsee polun ”Käyttäjä”  
**Esiehto:** Sovelluksessa on olemassa vähintään yksi äänestys  
**Jälkiehto:** Käyttäjä on nähnyt listan tarjolla olevista äänestyksistä  

**Käyttötapauksen kulku:**
1. Käyttäjä avaa sovelluksen ja valitsee polun ”Käyttäjä”
2. Sovellus hakee ja näyttää listan äänestyksistä
3. Käyttäjä selaa listaa

**Poikkeuksellinen toiminta:**  
Jos yhtään äänestystä ei ole, näytetään tyhjä lista ja viesti ”Ei äänestyksiä”

---

## Käyttötapaus: Näytä äänestystilanne

**Käyttäjät:** Tavallinen käyttäjä  
**Laukaisija:** Käyttäjä valitsee tietyn äänestyksen listalta  
**Esiehto:** Valittu äänestys on olemassa  
**Jälkiehto:** Käyttäjä on nähnyt äänestyksen tämänhetkiset tulokset  

**Käyttötapauksen kulku:**
1. Käyttäjä valitsee äänestyksen
2. Sovellus näyttää tulokset

**Poikkeuksellinen toiminta:**  
Jos äänestyksen tuloksia ei pystytä näyttämään, näytetään virheilmoitus

---

## Käyttötapaus: Äänestä

**Käyttäjät:** Tavallinen käyttäjä  
**Laukaisija:** Käyttäjä valitsee vastausvaihtoehdon ja vahvistaa äänensä  
**Esiehto:** Valittu äänestys on olemassa  
**Jälkiehto:** Käyttäjän ääni on tallennettu selaimen muistiin ja uusi tulos näytetty  

**Käyttötapauksen kulku:**
1. Käyttäjä valitsee äänestyksen
2. Valitsee vastausvaihtoehdon
3. Vahvistaa äänensä
4. Sovellus tallentaa äänen selaimen muistiin ja päivittää tulokset

**Poikkeuksellinen toiminta:**  
Jos tallennus epäonnistuu, näytetään virheilmoitus

---

## Käyttötapaus: Luo uusi äänestys

**Käyttäjät:** Ylläpitäjä  
**Laukaisija:** Ylläpitäjä avaa uuden äänestyksen luontinäkymän  
**Esiehto:** Ylläpitäjä on kirjautunut ylläpitotilaan  
**Jälkiehto:** Uusi äänestys on lisätty selaimen muistiin ja näkyy listalla  

**Käyttötapauksen kulku:**
1. Ylläpitäjä avaa luontinäkymän
2. Syöttää kysymyksen ja vastausvaihtoehdot
3. Tallentaa uuden äänestyksen
4. Sovellus lisää sen listalle ja näyttää onnistumisviestin

**Poikkeuksellinen toiminta:**  
Jos kentät ovat tyhjiä, sovellus ei salli tallennusta ja pyytää täyttämään puuttuvat tiedot

---

## Käyttötapaus: Poista äänestys

**Käyttäjät:** Ylläpitäjä  
**Laukaisija:** Ylläpitäjä valitsee poistettavan äänestyksen ja painaa ”Poista”  
**Esiehto:** Poistettava äänestys on olemassa  
**Jälkiehto:** Äänestys on poistettu listalta eikä sitä voi enää selata tai äänestää  

**Käyttötapauksen kulku:**
1. Ylläpitäjä valitsee poistettavan äänestyksen
2. Valitsee ”Poista”
3. Sovellus poistaa äänestyksen ja näyttää vahvistusviestin

**Poikkeuksellinen toiminta:**  
Jos poistettavaa äänestystä ei pysty poistamaan, näytetään virheilmoitus


