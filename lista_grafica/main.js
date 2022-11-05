let edtNota = document.getElementById("edtNota")
const btnAdd = document.getElementById("btnAdd")
const btnClear = document.getElementById("btnClear")
const ulTag = document.getElementById("listToDo")
const bodyTag = document.getElementById("tabBody")
let cont = 1;

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

btnClear.onclick = function(){
    if (confirm("ATTENZIONE: Sei sicuro di voler cancellare la lista?") == true)
    {
        ClearList()
    }
}
btnAdd.onclick = function(){
    const data = new Date();
    const giorno = data.toLocaleDateString();
    const ora = data.toLocaleTimeString();
    const testo = edtNota.value
    AddToTab(testo);
    edtNota.value = ""
    edtNota.focus()
    localStorage.setItem("Lista", ulTag.innerHTML)
}

ClearList()

