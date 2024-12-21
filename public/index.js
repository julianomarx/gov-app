let dados; // Variável global para armazenar a resposta

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    console.log(event.type);
    console.log(event.target);

    const form = event.target;

    // Captura os dados do formulário
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log('Dados do formulário:', data);

    try {
        // Faz a requisição para o servidor
        const retorno = await fetch('/get-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!retorno.ok) {
            // Lê o texto do erro retornado pela API e lança uma exceção
            const errorText = await retorno.text();
            throw new Error(`Erro na API: ${errorText}`);
        }

        // Processa a resposta JSON
        dados = await retorno.json();
        console.log('Resposta do servidor:', dados);

    } catch (error) {
        // Captura e exibe erros
        console.error('Erro na requisição:', error.message);
    }

    // Acessando o token se existir
    if (dados) {
        console.log('Token recebido:', dados.access_token);
    }
});
