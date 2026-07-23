function carregarControleAcesso() {

    alterarTitulo("Controle de Acesso");

    const content = document.getElementById("content");

    content.innerHTML = `
    
        <section class="page-header">

            <h1>Controle de Acesso</h1>

            <p>Registro de entrada e saída dos visitantes.</p>

        </section>

        <div class="table-container">

            <h2>Visitantes</h2>

            <div class="search-box">

                <input
                    type="text"
                    id="pesquisaAcesso"
                    placeholder="Pesquisar visitante...">

            </div>

            <table class="table">

                <thead>

                    <tr>

                        <th>Nome</th>
                        <th>Empresa</th>
                        <th>Status</th>
                        <th>Ação</th>

                    </tr>

                </thead>

                <tbody id="listaControle">

                </tbody>

            </table>

        </div>

    `;

    // Atualiza a tabela após criar o HTML
    atualizarControle();
}

function atualizarControle() {

    const lista = document.getElementById("listaControle");

    lista.innerHTML = "";

    // Caso não exista nenhum visitante
    if (visitantes.length === 0) {

        lista.innerHTML = `
            <tr>
                <td colspan="4" class="empty">
                    Nenhum visitante cadastrado.
                </td>
            </tr>
        `;

        return;
    }

    visitantes.forEach(function (visitante, indice) {

        lista.innerHTML += `

            <tr>

                <td>${visitante.nome}</td>

                <td>${visitante.empresa || "-"}</td>

                <td>Fora</td>

                <td>

                    <button
                        class="btn-primary"
                        onclick="registrarEntrada(${indice})">

                        Entrar

                    </button>

                </td>

            </tr>

        `;

    });

}

function registrarEntrada(indice) {

    alert("Entrada do visitante " + indice);

}