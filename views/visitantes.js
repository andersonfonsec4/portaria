// Banco de dados temporário (em memória)
let visitantes = JSON.parse(localStorage.getItem("visitantes")) || [];

let indiceEdicao = -1;

function carregarVisitantes() {
  alterarTitulo("Cadastro de Visitantes");

  const content = document.getElementById("content");

  content.innerHTML = `

        <section class="page-header">

            <h1>Cadastro de Visitantes</h1>

<p>
Cadastre visitantes para utilização no controle de acesso.
</p>

            <p>Cadastre e gerencie os visitantes do sistema.</p>

        </section>

        <div class="page-content">

            <section class="table-container">

                <h2>Lista de Visitantes</h2>
                <div class="search-box">

    <input
        type="text"
        id="pesquisa"
        placeholder="🔍 Pesquisar visitante..."
        onkeyup="pesquisarVisitante()">

</div>

                <table class="table">

                    <thead>

                        <tr>

                            <th>Nome</th>
                            <th>Documento</th>
                            <th>Empresa</th>
                            <th>Ações</th>

                        </tr>

                    </thead>

                    <tbody id="listaVisitantes">

                        <tr>

                            <td colspan="4">

                                Nenhum visitante cadastrado.

                            </td>

                        </tr>

                    </tbody>

                </table>

            </section>

            <section class="form-container">

                <form id="formVisitante">

                    <div class="form-group">

                        <label for="nome">Nome Completo</label>

                        <input
                            type="text"
                            id="nome"
                            placeholder="Digite o nome completo">

                    </div>

                    <div class="form-group">

                        <label for="documento">Documento</label>

                        <input
                            type="text"
                            id="documento"
                            placeholder="CPF ou RG">

                    </div>

                    <div class="form-group">

                        <label for="telefone">Telefone</label>

                        <input
                            type="text"
                            id="telefone"
                            placeholder="Telefone">

                    </div>

                    <div class="form-group">

                        <label for="empresa">Empresa</label>

                        <input
                            type="text"
                            id="empresa"
                            placeholder="Empresa">

                    </div>

                    <button
                        id="btnSalvar"
                        type="button"
                        class="btn-primary"
                        onclick="salvarVisitante()">

                        Salvar Visitante

                    </button>

                </form>

            </section>

        </div>

    `;

  atualizarTabela();
}

function salvarVisitante() {
  // Captura os dados do formulário

  const nome = document.getElementById("nome").value;

  const documento = document.getElementById("documento").value;

  const telefone = document.getElementById("telefone").value;

  const empresa = document.getElementById("empresa").value;

  // Validação

  if (nome.trim() === "" || documento.trim() === "") {
    alert("Preencha Nome e Documento.");

    return;
  }

  // Cria objeto

  const visitante = {
    nome,
    documento,
    telefone,
    empresa,
  };

  // Salva ou atualiza

  if (indiceEdicao === -1) {
    visitantes.push(visitante);
  } else {
    visitantes[indiceEdicao] = visitante;

    indiceEdicao = -1;
  }
  localStorage.setItem("visitantes", JSON.stringify(visitantes));

  // Atualiza tabela

  atualizarTabela();

  // Limpa formulário

  document.getElementById("formVisitante").reset();

  // Restaura botão

  document.getElementById("btnSalvar").textContent = "Salvar Visitante";

  // Foco

  document.getElementById("nome").focus();

  console.log(visitantes);
}

function atualizarTabela() {
  const lista = document.getElementById("listaVisitantes");
  const textoPesquisa = document.getElementById("pesquisa").value.toLowerCase();

  // Não existe nenhum visitante cadastrado
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

  lista.innerHTML = "";

  visitantes.forEach(function (visitante, indice) {
    const encontrado =
      visitante.nome.toLowerCase().includes(textoPesquisa) ||
      visitante.documento.toLowerCase().includes(textoPesquisa) ||
      visitante.empresa.toLowerCase().includes(textoPesquisa);

    if (!encontrado) {
      return;
    }

    lista.innerHTML += `
      <tr>

        <td>${visitante.nome}</td>

        <td>${visitante.documento}</td>

        <td>${visitante.empresa}</td>

        <td>

          <a href="#" onclick="editarVisitante(${indice})">
            Editar
          </a>

          |

          <a href="#" onclick="excluirVisitante(${indice})">
            Excluir
          </a>

        </td>

      </tr>
    `;
  });

  // Pesquisa não encontrou nenhum visitante
  if (lista.innerHTML === "") {
    lista.innerHTML = `
      <tr>
        <td colspan="4" class="empty">
          Nenhum visitante encontrado.
        </td>
      </tr>
    `;
  }
}

function editarVisitante(indice) {
  indiceEdicao = indice;

  const visitante = visitantes[indice];

  document.getElementById("nome").value = visitante.nome;

  document.getElementById("documento").value = visitante.documento;

  document.getElementById("telefone").value = visitante.telefone;

  document.getElementById("empresa").value = visitante.empresa;

  document.getElementById("btnSalvar").textContent = "Atualizar Visitante";
}

function excluirVisitante(indice) {
  const visitante = visitantes[indice];

  const confirmar = confirm(
    `Deseja realmente excluir o visitante:\n\n${visitante.nome}?`,
  );

  if (!confirmar) {
    return;
  }

  visitantes.splice(indice, 1);

  localStorage.setItem("visitantes", JSON.stringify(visitantes));

  atualizarTabela();
}
function pesquisarVisitante() {
  atualizarTabela();
}
