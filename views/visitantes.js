function carregarVisitantes() {

    alterarTitulo("Visitantes");

    const content = document.getElementById("content");

    content.innerHTML = `

        <section class="page-header">

            <h1>Cadastro de Visitantes</h1>

            <p>Cadastre e gerencie os visitantes do sistema.</p>

        </section>

        <div class="page-content">

            <section class="table-container">

                <h2>Lista de Visitantes</h2>

                <p>Nenhum visitante cadastrado.</p>

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

                    <button type="submit" class="btn-primary">

                        Salvar Visitante

                    </button>

                </form>

            </section>

        </div>

    `;

}