function digita(n){
    document.form.area_di_calcolo.value = document.form.area_di_calcolo.value + n
}
  
function esegui() {
    var operazione = document.form.area_di_calcolo.value;
    if (operazione){
        document.form.area_di_calcolo.value = eval(operazione); //La funzione eval valuta l’espressione 
                                                         //passata come argomento e se c’è un’operazione la esegue
    }
}
  
function resetta() {
    document.form.area_di_calcolo.value = '';
}
  
function cancella() {
    var s = document.form.area_di_calcolo.value;
    document.form.area_di_calcolo.value = s.substring(0, s.length-1); //a.substring restituisce una parte della stringa 
                                                                      //dalla pos richiesta
}