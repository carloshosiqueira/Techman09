// Get the modal
var modal = document.getElementById("createEquipamentoModal");
var excluir = document.getElementById("deleteEquipamentoModal");

// Function to open the modal
function openModal() {
    modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
    modal.style.display = "none";
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
}

// Handle form submission
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

    } catch (e) {
        console.error(e);
        alert('Erro ao salvar novo equipamento: ' + e.message);
    }
});

const btnExcluir = document.getElementById('btnExcluir');
btnExcluir.addEventListener('click', (e)=> {
    e.preventDefault();
    excluir.style.display = 'block';
})


// // Confirm deletion
// document.getElementById('confirmDelete').addEventListener('click', async () => {
//     try {
//         const response = await fetch(`http://localhost:3000/equipamento/$`, {
//             method: 'DELETE',
//         });

//         if (response.ok) {
//             // Optionally, remove the element from the DOM
//             document.querySelector(`[data-id="${equipamentoIdToDelete}"]`).remove();
//             deleteEquipamentoModal.style.display = 'none'; // Close the modal
//         } else {
//             console.error('Failed to delete equipamento');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }
// });