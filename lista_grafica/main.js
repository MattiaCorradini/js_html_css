/*
1. Cancellazione lista in avvio
2. Alla pressione del bottone inserire un item nella 
    lista contenente data e ora + il testo dell'input text
3. Inserire codice per cancellare la lista mediante
    bottone
*/
// Definizione oggetti html
let edtNota = document.getElementById("edtNota")
const btnAdd = document.getElementById("btnAdd")
const btnClear = document.getElementById("btnClear")
const ulTag = document.getElementById("listToDo")
const bodyTag = document.getElementById("tabBody")
let cont = 1;
// FUNZIONI
function ClearList(){
    bodyTag.innerHTML = "";
    localStorage.clear();
}

function AddToList(text){
    let elementToAdd = document.createElement("li");
    elementToAdd.innerHTML = text;
    ulTag.appendChild(elementToAdd);

}

function AddToTab(text){
    const data = new Date();
    const giorno = data.toLocaleDateString();
    const ora = data.toLocaleTimeString();
    let lineToAdd = document.createElement("tr");
    let el_1 = document.createElement("th");
    el_1.innerHTML = cont;
    lineToAdd.appendChild(el_1)
    let el_2 = document.createElement("td");
    el_2.innerHTML = giorno;
    lineToAdd.appendChild(el_2)
    let el_3 = document.createElement("td");
    el_3.innerHTML = ora;
    lineToAdd.appendChild(el_3)
    let el_4 = document.createElement("td");
    el_4.innerHTML = text;
    lineToAdd.appendChild(el_4)
    bodyTag.appendChild(lineToAdd);
    cont = cont + 1;
    
}
// EVENTI
btnClear.onclick = function(){
    if (confirm("ATTENZIONE: Cancellazione lista") == true)
    {
        ClearList()
    }
}
btnAdd.onclick = function(){
    const data = new Date();
    const giorno = data.toLocaleDateString();
    const ora = data.toLocaleTimeString();
    const testo = edtNota.value
    //AddToList(giorno + " " + ora + " " + testo);
    AddToTab(testo);
    edtNota.value = ""
    edtNota.focus()
    localStorage.setItem("Lista", ulTag.innerHTML)
}
// MAIN
ClearList()

