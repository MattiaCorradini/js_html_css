function digita(n){
    document.form.area_di_calcolo.value = document.form.area_di_calcolo.value + n
}
  
function esegui() {
    var operazione = document.form.area_di_calcolo.value;
    if (operazione){
        document.form.area_di_calcolo.value = eval(operazione); 
    }
}
  
function resetta() {
    document.form.area_di_calcolo.value = '';
}
  
function cancella() {
    var s = document.form.area_di_calcolo.value;
    document.form.area_di_calcolo.value = s.substring(0, s.length-1); 
}