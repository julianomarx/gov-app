//ao carregar o documento valida se já existe token setado
document.addEventListener("DOMContentLoaded", ()=>{ 

    let dados; // Variável global para armazenar a resposta

    //checar se já existe token

    fetchAndStoreToken();


    async function fetchAndStoreToken(){

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

                //cria a data de validade do token e seta ele no sessionStorage
                const now = new Date().getTime();
                const expiryTimeInSeconds = 3600;
                const expiry = now + expiryTimeInSeconds * 1000;

                const item = {
                    access_token: dados.access_token,
                    expiry: expiry
                };

                sessionStorage.setItem('tokenData', JSON.stringify(item));

                console.log("Definiu corretamente o token no navegador :", sessionStorage.getItem("tokenData"));

                console.log("Recuperando valor depois de definido :", JSON.parse(sessionStorage.getItem("tokenData")).access_token)

            }
        });
    }
})



