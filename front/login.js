document.addEventListener("DOMContentLoaded", () => {
    const login = document.getElementById('login');
    const senhaInput = login.senha;

    // Função para adicionar números ao campo de senha
    const adicionarNumero = (numero) => {
        senhaInput.value += numero;
    };

    // Adiciona evento de submit ao formulário
    login.addEventListener('submit', (e) => {
        e.preventDefault(); // Previne o envio padrão do formulário
        const senha = senhaInput.value;

        if (senha === "123") { // A comparação deve ser uma string
            window.location.href = './index.html';
        } else {
            alert("Senha incorreta");
            senhaInput.value = ""
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
});
