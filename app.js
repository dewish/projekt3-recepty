/*
Co je za úkol v tomto projektu:

1) Do prvku s id="recepty" vygeneruj z dat seznam všech receptů z naší "databáze".
HTML vzor, jak vygenerovaný recept vypadá, je zakomentovaný v index.html.

2) Doplň hledání - v hlavičce odkomentuj pole pro hledání. Pri kliknutí na tlačítko Hledat
by se měl seznam receptů vyfiltrovat podle hledaného slova.

3) Doplň filtrovanání receptů podle kategorie.

4) Doplň řazení receptů podle hodnocení.

5) Na recepty v seznamu by mělo jít kliknout a na pravé polovině, se objeví detail receptu.
Doplň patričné údaje receptu do HTML prvků s ID recept-foto, recept-kategorie,
recept-hodnoceni, recept-nazev, recept-popis.

6) Poslední vybraný recept ulož do Local Storage, aby se při novém otevření aplikace načetl.
*/

/////////////////////////////////////////////
// PARSE DATA FROM JSON

function loadJSON(path, success, error) {
  let request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        if (success) success(JSON.parse(request.responseText));
      } else {
        if (error) error(request);
      }
    }
  };
  request.open("GET", path, true);
  request.send();
}

/////////////////////////////////////////////
// DATA FROM JSON

const receptyElement = document.querySelector("#recepty");

loadJSON(
  "recepty.json",

  function (receptyData) {
    function receptyList(recepty) {
      return `      
            <div class="recept">
                <div class="recept-obrazek">
                    <img src="${recepty.img}" alt="Obrazek">
                </div>
                <div class="recept-info" id="${recepty.nadpis}">
                    <h3>${recepty.nadpis}</h3>
                </div>
            </div>
                    `;
    }

    function receptyInfo(recepty) {
      return `      
        <div class="recept-detail-obrazek">
          <img id="recept-foto" src="${recepty.img}" alt="" />
        </div>
        <div class="recept-detail-info">
          <header>
            <div class="recept-kategorie">
              <span class="fas fa-tag"></span> Kategorie:
              <span class="hodnota" id="recept-kategorie"
                >${recepty.kategorie}</span>
            </div>
            <div class="recept-hodnoceni">
              <span class="far fa-star"></span>
              <span class="hodnota" id="recept-hodnoceni"
                >${recepty.hodnoceni}</span>
            </div>
          </header>
          <h1 id="recept-nazev">${recepty.nadpis}</h1>
          <p id="recept-popis">${recepty.popis}</p>
        </div>
       `;
    }

    document.getElementById("recepty_list").innerHTML = `
      <div>  
        ${receptyData.map(receptyList).join("")}</div> `;

    receptyElement.addEventListener("click", (e) => {
      let selectedRecept = receptyData.find(
        (recept) => recept.nadpis === e.target.id
      );

      document.getElementById("deatil").innerHTML = `
        <div> ${receptyInfo(selectedRecept)}</div> `;
    });
  },

  function (xhr) {
    console.error(xhr);
  }
);
