document.getElementById("page-title").textContent = "Configurações";
function carregarConfiguracoes() {
    document.getElementById("page-title").textContent = "Configurações";

    const content = document.getElementById("content");

    content.innerHTML = `

        <h1>Configurações</h1>

        <p>Configurações do sistema.</p>

    `;

}