
function carregarDashboard() {
    alterarTitulo("Dashboard");

    // Busca os dados do LocalStorage
    const visitantes = JSON.parse(localStorage.getItem("visitantes")) || [];
    const acessos = JSON.parse(localStorage.getItem("acessos")) || [];
    const entregas = JSON.parse(localStorage.getItem("entregas")) || [];

    // Filtra as entregas por status
    const entregasPendentes = entregas.filter(function (entrega) {
        return entrega.status === "Pendente";
    });

    const entregasRecebidas = entregas.filter(function (entrega) {
        return entrega.status === "Recebida";
    });

    // Visitantes atualmente dentro
    const visitantesDentro = acessos.filter(function (acesso) {
        return acesso.saida === null;
    });

    // Data de hoje
    const hoje = new Date().toLocaleDateString("pt-BR");

    // Entradas realizadas hoje
    const entradasHoje = acessos.filter(function (acesso) {
        return acesso.entrada.startsWith(hoje);
    });

    // Saídas realizadas hoje
    const saidasHoje = acessos.filter(function (acesso) {
        return (
            acesso.saida !== null &&
            acesso.saida.startsWith(hoje)
        );
    });

    const content = document.getElementById("content");

    content.innerHTML = `
        <h1>Dashboard</h1>

        <p>Bem-vindo ao Sistema de Portaria.</p>

        <h2>Controle de acesso</h2>

        <div class="cards">
            <div class="card">
                <h3>Visitantes</h3>
                <span>${visitantes.length}</span>
            </div>

            <div class="card">
                <h3>Saídas Hoje</h3>
                <span>${saidasHoje.length}</span>
            </div>

            <div class="card">
                <h3>Dentro Agora</h3>
                <span>${visitantesDentro.length}</span>
            </div>

            <div class="card">
                <h3>Entradas Hoje</h3>
                <span>${entradasHoje.length}</span>
            </div>
        </div>

        <h2>Controle de entregas</h2>

        <div class="cards">
            <div class="card">
                <h3>Total de Entregas</h3>
                <span>${entregas.length}</span>
            </div>

            <div class="card">
                <h3>Entregas Pendentes</h3>
                <span>${entregasPendentes.length}</span>
            </div>

            <div class="card">
                <h3>Entregas Recebidas</h3>
                <span>${entregasRecebidas.length}</span>
            </div>
        </div>
    `;
}
