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
// FUNZIONI
function ClearList(){
    let liTags = document.querySelectorAll("ul>li");
    for(let i = 0; i < liTags.length; i++){
        ulTag.removeChild(liTags[i]);
    }
}

function AddToList(text, append = true){
    let elementToAdd = document.createElement("li");
    elementToAdd.innerHTML = text;
    if(append){
        ulTag.appendChild(elementToAdd);
    }else{
        ulTag.prepend(elementToAdd);
    }
}
// EVENTI
btnClear.onclick = function(){
    if (confirm("sei sicuro di voler cancellare?"))
        ClearList()
}
btnAdd.onclick = function(){
    const data = new Date();
    const giorno = data.toLocaleDateString();
    const ora = data.toLocaleTimeString();
    const testo = edtNota.value
    AddToList(giorno + " " + ora + " " + testo);
    edtNota.value = ""
    edtNota.focus()
}
// MAIN
ClearList()

