function carregarDashboard() {
    alterarTitulo("Dashboard");

    // Busca os dados do LocalStorage
    const visitantes = JSON.parse(localStorage.getItem("visitantes")) || [];
    const acessos = JSON.parse(localStorage.getItem("acessos")) || [];

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

    `;
}