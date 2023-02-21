
function fechaActual() {
    var fecha = new Date();
    var dia = fecha.getDate();
    var mes = fecha.getMonth();
    var year = fecha.getFullYear();
    document.write(year, "-", mes, "-", dia);
}
