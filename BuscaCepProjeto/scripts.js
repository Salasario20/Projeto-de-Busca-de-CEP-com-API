const inputCep = document.getElementById('cep');

inputCep.addEventListener('input', () => {
  const cep = inputCep.value;

  if (cep.length === 8) {
    buscarCEP(cep);
  }
});

function buscarCEP(cep) {
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.json())
    .then(data => exibirDados(data))
    .catch(error => {
      console.log(error);
      exibirErro();
    });
};

function exibirDados(dados) {
  const dadosApi = document.getElementById('dados-api');
  dadosApi.classList.remove('hidden');

  const outputLogradouro = document.getElementById('outputLogradouro');
  const outputBairro = document.getElementById('outputBairro');
  const outputCidade = document.getElementById('outputCidade');
  const outputUF = document.getElementById('outputUF');

  if (dados.logradouro) {
    outputLogradouro.textContent = `Logradouro: ${dados.logradouro}`;
  } else {
    outputLogradouro.style.display = 'none';
  }

  if (dados.bairro) {
    outputBairro.textContent = `Bairro: ${dados.bairro}`;
  } else {
    outputBairro.style.display = 'none';
  }

  if (dados.localidade) {
    outputCidade.textContent = `Cidade: ${dados.localidade}`;
  } else {
    outputCidade.style.display = 'none';
  }

  if (dados.uf) {
    outputUF.textContent = `UF: ${dados.uf}`;
  } else {
    outputUF.style.display = 'none';
  }

  if (!dados.logradouro && !dados.bairro && !dados.localidade && !dados.uf) {
    alert('Não foram encontrados dados para o CEP informado.');
    location.reload();
  }
};
