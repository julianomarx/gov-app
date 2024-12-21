async function getToken(username, password) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("x-app-key", "fd7dc181-d4a3-4371-a30d-835511796bc2");
  myHeaders.append("Authorization", "Basic QUNDT1JBVF9DbGllbnQ6d05BX3hMTERwcFFHMkRDcExORmJfQzFm");
  
  const urlencoded = new URLSearchParams();
  urlencoded.append("username", username);
  urlencoded.append("password", password);
  urlencoded.append("grant_type", "password");
  
  const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
  };
  
  try {
    const retorno = await fetch("https://acc2-uat-oc.hospitality-api.us-ashburn-1.ocs.oc-test.com//oauth/v1/tokens", requestOptions);

    if (!retorno.ok) {
        // Lê e lança o texto do erro retornado pela API
        const errorText = await retorno.text();
        throw new Error(`Erro na API: ${errorText}`);
    }

    // Retorna o JSON da resposta
    return await retorno.json();

  } catch (error) {
      // Propaga o erro para quem chamou
      throw new Error(`Falha ao buscar o token: ${error.message}`);
  }
}

module.exports = getToken;
