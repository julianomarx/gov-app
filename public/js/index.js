import { fetchAndStoreToken } from './auth.js';

//ao carregar o documento valida se já existe token setado
document.addEventListener("DOMContentLoaded", ()=>{ 

    // Attach the event listener directly
    document.getElementById('loginForm').addEventListener('submit', fetchAndStoreToken);

})
