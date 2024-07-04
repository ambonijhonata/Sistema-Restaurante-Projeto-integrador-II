

const form = document.getElementById("form");
form.addEventListener('submit', (e) => {
    e.preventDefault();
    url = 'http://localhost:3000/login'
    const loginInput = document.getElementById('login');
    const passInput = document.getElementById('pass');
    
    const login = loginInput.value
    const pass = passInput.value

    const dados = {
        login: login,
        pass: pass
    }

    axios.post(url, dados)
        .then(response => {
            if (response.status === 200) {
                window.location.replace('./pedido.html');
                console.log(response)
            } else {
                alert('Usuário ou senha incorretos.');
            }
        })
        .catch(error => {
            console.error('Erro ao fazer login:', error);
            alert('Erro ao fazer login. Por favor, tente novamente mais tarde.');
        });
});
