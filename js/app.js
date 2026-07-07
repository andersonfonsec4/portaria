window.onload = function(){

    carregarDashboard();

    atualizarData();

}
function atualizarData(){

    const data = new Date();

    const opcoes = {

        day: "2-digit",
        month: "2-digit",
        year: "numeric"

    };

    document.getElementById("current-date").textContent =
        data.toLocaleDateString("pt-BR", opcoes);

}