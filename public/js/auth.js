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

        // Processa a resposta JSON
        const jwtToken = await retorno.json();
        console.log('Token recebido:', jwtToken);

        //armazena em sessionStorage o Token
        sessionStorage.setItem('jwtToken', JSON.stringify(jwtToken))

        console.log(JSON.parse(sessionStorage.getItem('jwtToken')))

        // Cria e armazena a data de validade do token
        // const now = new Date().getTime();
        // const expiry = now + 3580 * 1000; 

        // const item = {
        //     access_token: dados.access_token,
        //     expiry: expiry
        // };

        // sessionStorage.setItem('tokenData', JSON.stringify(item));
        // console.log("Token armazenado:", sessionStorage.getItem("tokenData"));
        // console.log("Recuperando apenas o token :", JSON.parse(sessionStorage.getItem("tokenData")).access_token)

        //logica para redirecionar para home 
        //window.location.href = '/home';


    } catch (error) {
        console.error('Erro na requisição:', error.message);
    }
}

// function isTokenValid() { //Funcao que retorna um booleano para status de token

//     const now = new Date().getTime();

//     const tokenData = JSON.parse(sessionStorage.getItem("tokenData"))

//     if(!tokenData || tokenData.expiry < now) {
//         console.log("Token inválido. Necessário autenticação...")
//         return false
//     } 

//     console.log("Token ainda válido, sem necessidade de renovação")
//     return true
// }

export { fetchAndStoreToken }