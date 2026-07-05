function carregarDashboard(){

    const content = document.getElementById("content");

    content.innerHTML = `
    
        <h1>Dashboard</h1>

        <p>Bem-vindo ao Sistema de Portaria.</p>

        <div class="cards">

            <div class="card">

                <h3>Visitantes</h3>

                <span>0</span>

            </div>

            <div class="card">

                <h3>Entregas</h3>

                <span>0</span>

            </div>

            <div class="card">

                <h3>Entradas Hoje</h3>

                <span>0</span>

            </div>

            <div class="card">

                <h3>Saídas Hoje</h3>

                <span>0</span>

            </div>

        </div>

    `;

}
