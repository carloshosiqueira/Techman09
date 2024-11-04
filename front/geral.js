addEventListener('DOMContentLoaded', () => {
    const uri = "http://localhost:3000/equipamento";
    const main = document.querySelector('main'); // Select the main element

    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (!usuario) {
        console.log('No user found in local storage');
        return; // Exit early if no user data is found
    }

    // Show the option for admins
    if (usuario.perfil.perfil === 'Administrador') {
        document.getElementById('novo-equipamento').style.display = 'block'; // Show the option for admins
    }

    async function getEquipamentos() {
        try {
            let response = await fetch(uri);

            if (!response.ok) {
                const error = await response.json();
                throw new Error('Não foi possível buscar os equipamentos: ' + error.message);
            }

            let equipamentos = await response.json();

            equipamentos.forEach(equipamento => {
                if (equipamento.ativo === true) {
                    const div = document.createElement('div');
                    div.dataset.id = equipamento.id;
                    div.className = 'equipamento'; // Add a class for styling
                    div.innerHTML = `
                    <div class="imagem">
                        <img src="./image/${equipamento.imagem}" alt="${equipamento.nome}">
                    </div>
                    <div class="texto">
                        <h2>${equipamento.nome}</h2>
                        <p>${equipamento.descricao}</p>
                        <div class="botoes">
                            <button id="btnComentario" onclick="abrirModalComentario(${equipamento.id})">&#128172;</button>
                            ${usuario.perfil.perfil === 'Administrador' ? `<button id="btnExcluir" onclick="abrirModalExcluir(${equipamento.id})">&#128465;</button>` : ''}
                        </div>
                    </div>`;
                    main.appendChild(div);
                }
            });
        } catch (e) {
            console.error("Erro ao encontrar os equipamentos: " + e);
        }
    }

    //logout
    document.getElementById('logout').addEventListener('click', function() {
        localStorage.removeItem('usuario');
        window.location.href = 'login.html';
        });

    getEquipamentos();
});
