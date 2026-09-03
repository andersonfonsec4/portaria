let entregas = JSON.parse(localStorage.getItem("entregas")) || [];

function carregarEntregas() {
  alterarTitulo("Entregas");

  const content = document.getElementById("content");

  content.innerHTML = `

        <section class="page-header">

            <h1>Controle de Entregas</h1>

            <p>Registre e acompanhe as entregas recebidas na portaria.</p>

        </section>

        <div class="page-content">

            <section class="form-container">

                <h2>Registrar Entrega</h2>

                <form id="formEntrega">

                    <div class="form-group">

                        <label for="destinatario">
                            Destinatário
                        </label>

                        <input
                            type="text"
                            id="destinatario"
                            placeholder="Nome do destinatário">

                    </div>

                    <div class="form-group">

                        <label for="empresaEntrega">
                            Empresa
                        </label>

                        <input
                            type="text"
                            id="empresaEntrega"
                            placeholder="Empresa">

                    </div>

                    <div class="form-group">

                        <label for="entregador">
                            Entregador
                        </label>

                        <input
                            type="text"
                            id="entregador"
                            placeholder="Nome do entregador">

                    </div>

                    <div class="form-group">

                        <label for="descricaoEntrega">
                            Descrição da Entrega
                        </label>

                        <input
                            type="text"
                            id="descricaoEntrega"
                            placeholder="Ex: Caixa, documento, encomenda...">

                    </div>

                    <button
                        type="button"
                        class="btn-primary"
                        onclick="registrarEntrega()">

                        Registrar Entrega

                    </button>

                </form>

            </section>


            <section class="table-container">

                <h2>Entregas Registradas</h2>

                <table class="table">

                    <thead>

                        <tr>

                            <th>Destinatário</th>
                            <th>Empresa</th>
                            <th>Entregador</th>
                            <th>Descrição</th>
                            <th>Data</th>
                            <th>Status</th>
                            <th>Ação</th>

                        </tr>

                    </thead>

                    <tbody id="listaEntregas">

                    </tbody>

                </table>

            </section>

        </div>

    `;

  atualizarListaEntregas();
}

function registrarEntrega() {
  const destinatario = document.getElementById("destinatario").value;

  const empresa = document.getElementById("empresaEntrega").value;

  const entregador = document.getElementById("entregador").value;

  const descricao = document.getElementById("descricaoEntrega").value;

  if (destinatario.trim() === "" || descricao.trim() === "") {
    alert("Preencha o destinatário e a descrição da entrega.");

    return;
  }

  const entrega = {
    destinatario,
    empresa,
    entregador,
    descricao,

    data: new Date().toLocaleString("pt-BR"),

    status: "Pendente",
  };

  entregas.push(entrega);

  localStorage.setItem("entregas", JSON.stringify(entregas));

  alert("Entrega registrada com sucesso!");

  document.getElementById("formEntrega").reset();

  atualizarListaEntregas();
}

function atualizarListaEntregas() {
  const lista = document.getElementById("listaEntregas");

  entregas = JSON.parse(localStorage.getItem("entregas")) || [];

  lista.innerHTML = "";

  if (entregas.length === 0) {
    lista.innerHTML = `

            <tr>

                <td colspan="6" class="empty">

                    Nenhuma entrega registrada.

                </td>

            </tr>

        `;

    return;
  }

  entregas.forEach(function (entrega) {
    lista.innerHTML += `

            <tr>

                <td>${entrega.destinatario}</td>

                <td>${entrega.empresa || "-"}</td>

                <td>${entrega.entregador || "-"}</td>

                <td>${entrega.descricao}</td>

                <td>${entrega.data}</td>

                <td>${entrega.status}</td>

<td>

    ${
      entrega.status === "Pendente"
        ? `
                <button
                    class="btn-primary"
                    onclick="receberEntrega(${entregas.indexOf(entrega)})">

                    Receber

                </button>
            `
        : "Recebida"
    }

</td>

            </tr>

        `;
  });
}
function receberEntrega(indice) {

    entregas[indice].status = "Recebida";

    localStorage.setItem(
        "entregas",
        JSON.stringify(entregas)
    );

    atualizarListaEntregas();

}