// Get the Modal
var createModal = document.getElementById("createEquipamentoModal");
var deleteModal = document.getElementById("deleteEquipamentoModal");
var comentarioModal = document.getElementById("comentarioEquipamentoModal");
var createComentarioModal = document.getElementById("createComentarioEquipamentoModal");
var equipamentoIdToDelete;
let equipamentoIdGlobal = null;

function openModal() {
    createModal.style.display = "block";
}

function closeModal() {
    createModal.style.display = "none";
}

function closeDeleteModal() {
    deleteModal.style.display = "none";
}

function abrirModalExcluir(equipamentoId) {
    equipamentoIdToDelete = equipamentoId;
    deleteModal.style.display = 'block';
    console.log(equipamentoIdToDelete);
}

function abrirModalComentario(equipamentoId){
    comentarioModal.style.display = 'block';
    equipamentoIdGlobal = equipamentoId
}

function closeComentarioModal() {
    comentarioModal.style.display = "none";
}
function abrirCreateModalComentario(){
    createComentarioModal.style.display = 'block';
    comentarioModal.style.display = 'none';
}

function closeCreateComentarioModal() {
    createComentarioModal.style.display = "none";
}



// Handle form submission for creating an equipment
document.getElementById('equipamentoForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    try {
        const nome = document.getElementById('nome').value;
        const descricao = document.getElementById('descricao').value;
        const data = new Date().toISOString(); // Convert to ISO string
        const ativo = document.getElementById('ativo').value === 'true'; // Convert string to boolean
        const imagem = document.getElementById('imagem').value;

        // Create the equipamento object
        const novoEquipamento = {
            nome,
            descricao,
            data,
            ativo,
            imagem
        };

        // Send the POST request
        let response = await fetch('http://localhost:3000/equipamento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoEquipamento) // Send the data as JSON
        });

        if (!response.ok) {
            throw new Error('Erro ao criar novo equipamento');
        }

        let equipamento = await response.json();
        console.log('Novo equipamento criado:', equipamento);

        // Optionally, close the modal after submission
        closeModal();
        window.location.reload();

    } catch (e) {
        console.error(e);
        alert('Erro ao salvar novo equipamento: ' + e.message);
    }
});

// Confirm deletion
document.getElementById('confirmDelete').addEventListener('click', async () => {
    try {
        const response = await fetch(`http://localhost:3000/equipamento/${equipamentoIdToDelete}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            // Optionally, remove the element from the DOM
            document.querySelector(`[data-id="${equipamentoIdToDelete}"]`).remove();
            deleteModal.style.display = 'none'; // Close the modal
        } else {
            console.error('Failed to delete equipamento');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

//Exibir Comentarios
const divComentarios = document.getElementById('comentarios');
async function getComentarios (equipamentoId) {
    try {
        const response = await fetch(`http://localhost:3000/comentario/equipamento/${equipamentoId}`);
        const comentarios = await response.json();
        divComentarios.innerHTML = '';

        comentarios.forEach(comentario => {
            const comentarioFeito = document.createElement('div');
            comentarioFeito.className = 'comentario';

            comentarioFeito.innerHTML = `
                <div class="cabecalho">
                    <span>${comentario.usuario.perfil.perfil} - ${comentario.data.split('T')[0]}</span>
                </div>
                <p>${comentario.comentario}</p>
            `;

            divComentarios.appendChild(comentarioFeito);
        }); 
} catch (e) {
    console.error(e);
    alert('Erro ao buscar comentarios:'+ e.message);
}
}


//Add comentario

const formAddComentario = document.getElementById('comentarioForm');

formAddComentario.addEventListener('submit', async (event) => {
    event.preventDefault();
    const texto = formAddComentario.novocomentario.value.trim();
    if (texto === '') {
        alert("O comentário não pode ser vazio ou conter apenas espaços!");
        return;
    }

    const data = new Date();
    const dataISO = data.toISOString();
    
    const IdEquipamento = equipamentoIdGlobal;

    // Obter o ID do usuário atual do localStorage
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const usuarioId = usuario ? usuario.id : null;
    console.log(usuarioId);
    // Verificar se o 'usuarioId' está presente
    if (!usuarioId) {
        alert("Você precisa estar logado para adicionar um comentário!");
        return;
    }

    // Criar o objeto de comentário para enviar ao backend
    const novoComentario = {
        comentario: texto,
        data: dataISO,
        usuarioId: usuarioId,
        equipamentoId: IdEquipamento,
    };

    try {
        // Enviar o comentário para o backend via POST
        const response = await fetch('http://localhost:3000/comentario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novoComentario),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Comentário enviado com sucesso!', data);
            alert('Sucesso! Comentário cadastrado para o equipamento.');
            formAddComentario.novocomentario.value = '';
            comentarioModal.style.display = 'none';
        } else {
            console.error('Erro ao enviar o comentário');
        }
    } catch (error) {
        console.error('Erro de rede:', error);
        alert('Erro ao enviar o comentário. Tente novamente mais tarde.');
    }

    window.location.reload();
});
