function carregarHistorico() {

    alterarTitulo("Histórico");

    const content = document.getElementById("content");

    content.innerHTML = `

        <section class="page-header">

            <h1>Histórico de Acessos</h1>

            <p>Consulta de entradas e saídas dos visitantes.</p>

        </section>

        <div class="table-container">

            <div class="search-box">

                <input
                    type="text"
                    id="pesquisaHistorico"
                    placeholder="🔍 Pesquisar visitante..."
                    onkeyup="pesquisarHistorico()">

            </div>

            <table class="table">

                <thead>

                    <tr>

                        <th>Visitante</th>
                        <th>Empresa</th>
                        <th>Entrada</th>
                        <th>Saída</th>
                        <th>Status</th>

                    </tr>

                </thead>

                <tbody id="listaHistorico">

                </tbody>

            </table>

        </div>

    `;

    atualizarHistorico();

}


function atualizarHistorico() {

    const lista = document.getElementById("listaHistorico");

    const acessos = JSON.parse(
        localStorage.getItem("acessos")
    ) || [];

    const visitantes = JSON.parse(
        localStorage.getItem("visitantes")
    ) || [];

    const textoPesquisa = document
        .getElementById("pesquisaHistorico")
        .value
        .toLowerCase();

    lista.innerHTML = "";

    if (acessos.length === 0) {

        lista.innerHTML = `

            <tr>

                <td colspan="5" class="empty">

                    Nenhum registro encontrado.

                </td>

            </tr>

        `;

        return;
    }

    acessos.forEach(function (acesso) {

        const visitante = visitantes[acesso.visitanteId];

        const encontrado = visitante.nome
            .toLowerCase()
            .includes(textoPesquisa);

        if (!encontrado) {

            return;

        }

        lista.innerHTML += `

            <tr>

                <td>${visitante.nome}</td>

                <td>${visitante.empresa || "-"}</td>

                <td>${acesso.entrada}</td>

                <td>${acesso.saida || "-"}</td>

                <td>

                    <span class="${
                        acesso.status === "Dentro"
                            ? "status-dentro"
                            : "status-fora"
                    }">

                        ${
                            acesso.status === "Dentro"
                                ? "🟢 Dentro"
                                : "⚪ Fora"
                        }

                    </span>

                </td>

            </tr>

        `;

    });

    if (lista.innerHTML === "") {

        lista.innerHTML = `

            <tr>

                <td colspan="5" class="empty">

                    Nenhum registro encontrado.

                </td>

            </tr>

        `;

    }

}


function pesquisarHistorico() {

    atualizarHistorico();

}