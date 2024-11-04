// Get the Modal
var createModal = document.getElementById("createEquipamentoModal");
var deleteModal = document.getElementById("deleteEquipamentoModal");
var comentarioModal = document.getElementById("comentarioEquipamentoModal");
var equipamentoIdToDelete;

// Function to open the create modal
function openModal() {
    createModal.style.display = "block";
}

// Function to close the create modal
function closeModal() {
    createModal.style.display = "none";
}

function closeDeleteModal() {
    deleteModal.style.display = "none";
}

// Function to open the delete modal
function abrirModalExcluir(equipamentoId) {
    equipamentoIdToDelete = equipamentoId; // Store the ID to delete
    deleteModal.style.display = 'block';
    console.log(equipamentoIdToDelete);
}

function abrirModalComentario(){
    comentarioModal.style.display = 'block';
}

function closeComentarioModal() {
    comentarioModal.style.display = "none";
}

// Handle form submission for creating an equipment
document.getElementById('equipamentoForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    try {
        const nome = document.getElementById('nome').value;
        const descricao = document.getElementById('descricao').value;
        const dataInput = document.getElementById('data').value; // Get input value
        const data = new Date(dataInput).toISOString(); // Convert to ISO string
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
        divComentarios.innerHTML = ''; // Limpa os comentarios antigos
        comentarios.forEach(comentario => {
            const comentarioFeito = document.createElement('div');
            comentarioFeito.className = 'comentario';
            comentarioFeito.innerHTML = `
                <h3>${comentario.nome}</h3>
                <p>${comentario.comentario}</p>
                <p>${comentario.data.split('T')[0]}</p>
            `;

            divComentarios.appendChild(comentarioFeito);
        });
} catch (e) {
    console.error(e);
    alert('Erro ao buscar comentarios:'+ e.message);
}
}