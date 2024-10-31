document.addEventListener('DOMContentLoaded', () => {
    const senhaInput = document.getElementById('senha');
    const entrar = document.getElementById('submit');

    const adicionarNumero = (numero) => {
        senhaInput.value += numero;
        senhaInput.dispatchEvent(new Event('input'));
    };

    entrar.disabled = true;
    senhaInput.addEventListener('input', () => {
        if (senhaInput.value.length >= 6) {
            entrar.disabled = false;
        } else {
            entrar.disabled = true;
        }
    });

     // Adiciona eventos aos botões numéricos
    const botoesNumeros = document.querySelectorAll('.tecla:not(#limpar, #submit)');
    botoesNumeros.forEach(botao => {
        botao.addEventListener('click', () => adicionarNumero(botao.textContent));
    });
 
     // Evento para o botão de limpar
     document.getElementById("limpar").addEventListener('click', () => {
         senhaInput.value = "";
     });

    // Handle form submission
    document.getElementById('login').addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission

        const senha = parseInt(senhaInput.value);

        let response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ senha }),
        })
        if (response.status == 401) {
            alert('Senha incorreta!');
            senhaInput.value = '';
        } else {
            const usuario = await response.json();
            localStorage.setItem('usuario', JSON.stringify({perfil: usuario.perfil})); // After login success
            window.location.href = 'index.html';
        }
        
    });
});
