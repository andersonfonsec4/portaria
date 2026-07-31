let acessos = JSON.parse(localStorage.getItem("acessos")) || [];

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
                    placeholder="🔍 Pesquisar visitante...">

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

  atualizarControle();
}

function atualizarControle() {
  acessos = JSON.parse(localStorage.getItem("acessos")) || [];

  const visitantes = JSON.parse(localStorage.getItem("visitantes")) || [];

  const lista = document.getElementById("listaControle");

  lista.innerHTML = "";

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
    const acessoAberto = acessos.find(function (acesso) {
      return acesso.visitanteId === indice && acesso.saida === null;
    });

    lista.innerHTML += `
            <tr>

                <td>${visitante.nome}</td>

                <td>${visitante.empresa || "-"}</td>

                <td>

    <span class="${acessoAberto ? "status-dentro" : "status-fora"}">

        ${acessoAberto ? "Dentro" : "Fora"}

    </span>

</td>

                    <button
                        class="${acessoAberto ? "btn-sair" : "btn-entrar"}"
                        onclick="${
                          acessoAberto
                            ? `registrarSaida(${indice})`
                            : `registrarEntrada(${indice})`
                        }">

                        ${acessoAberto ? "Sair" : "Entrar"}

                    </button>

                </td>

            </tr>
        `;
  });
}

function registrarEntrada(indice) {
  acessos = JSON.parse(localStorage.getItem("acessos")) || [];

  const acesso = {
    visitanteId: indice,
    entrada: new Date().toLocaleString("pt-BR"),
    saida: null,
    status: "Dentro",
  };

  acessos.push(acesso);

  localStorage.setItem("acessos", JSON.stringify(acessos));

  alert("Entrada registrada com sucesso!");

  atualizarControle();
}

function registrarSaida(indice) {
  acessos = JSON.parse(localStorage.getItem("acessos")) || [];

  const acesso = acessos.find(function (acesso) {
    return acesso.visitanteId === indice && acesso.saida === null;
  });

  if (!acesso) {
    return;
  }

  acesso.saida = new Date().toLocaleString("pt-BR");

  acesso.status = "Fora";

  localStorage.setItem("acessos", JSON.stringify(acessos));

  alert("Saída registrada com sucesso!");

  atualizarControle();
}
