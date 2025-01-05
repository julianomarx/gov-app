async function fetchAndStoreToken(event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    //Valida se os nego tão passando login em branco
    if (!data.username || !data.password) {
        console.error("Preencha todos os campos obrigatórios!");
        alert("Preencha todos os campos para poder efetuar login!")
        return;
    }

    try {
        // Faz a requisição para o servidor
        const retorno = await fetch('/get-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!retorno.ok) {
            const errorText = await retorno.text();
            throw new Error(`Erro na API: ${errorText}`);
        }

        // Aguarda a resposta do servidor
        const response = await retorno.json();

        if(response.ok) { 
            console.log('Login bem sucedido!')
            window.location.href = '/home';
        }
        
    } catch (error) {
        console.error('Erro na requisição:', error.message);
    }
}

export { fetchAndStoreToken }