function carregarDados(pessoa) {
    // busca o arquivo .txt da pessoa que clicou
    fetch(pessoa + '.txt')
        .then(function(response) {
            return response.json(); // transforma o texto em objeto JS
        })
        .then(function(dados) {
            preencherPagina(dados); // manda os dados para a função abaixo
        })
        .catch(function(erro) {
            console.error('Erro ao carregar:', erro);
        });
}

function preencherPagina(dados) {
    // pega cada id do HTML e coloca o valor do .txt

    document.getElementById('nome').textContent = dados.nome;
    document.getElementById('foto').src = dados.foto;
    document.getElementById('nascimento').textContent = 'Nascimento: ' + dados.nascimento;
    document.getElementById('email').textContent = 'E-mail: ' + dados.email;
    document.getElementById('telefone').textContent = 'Telefone: ' + dados.telefone;
    document.getElementById('linkedin').href = dados.linkedin;
    document.getElementById('github').href = dados.github;

    // conhecimentos: cria um <li> para cada item da lista
    var listaConhec = document.getElementById('conhecimentos');
    listaConhec.innerHTML = '';
    dados.conhecimentos.forEach(function(item) {
        var li = document.createElement('li');
        li.textContent = item;
        listaConhec.appendChild(li);
    });

    // experiencias: cria um bloco para cada experiencia
    var divExp = document.getElementById('experiencias');
    divExp.innerHTML = '';
    dados.experiencias.forEach(function(exp) {
        divExp.innerHTML += '<div class="item">' +
            '<strong>' + exp.cargo + '</strong> — ' + exp.empresa + '<br>' +
            exp.descricao + '<br>' +
            '<em>' + exp.inicio + ' – ' + exp.termino + '</em>' +
            '</div>';
    });

    // formacao: cria um bloco para cada formacao
    var divForm = document.getElementById('formacao');
    divForm.innerHTML = '';
    dados.formacao.forEach(function(form) {
        divForm.innerHTML += '<div class="item">' +
            '<strong>' + form.curso + '</strong><br>' +
            form.instituicao + '<br>' +
            '<em>' + form.termino + '</em>' +
            '</div>';
    });

    // mostra o conteudo (fica oculto ate carregar)
    document.getElementById('sec-foto').style.display = 'block';
}