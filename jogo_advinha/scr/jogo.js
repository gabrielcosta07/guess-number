const jogoAdivinha = {
    semente: 100,
    tentativa: 0,
    gerarNumero: function () {
      return Math.floor(Math.random() * (this.semente + 1));
    }
  };
  //pegando os elementos do html
  const btnVerifica = document.getElementById('btnVerifica');
  const status = document.getElementById('status');
  const tentativaElem = document.getElementById('tentativa');
  const chute = document.getElementById('chute');
  const formAdivinha = document.getElementById('form');
  
  //gera o numero aleatorio
  let numeroSorteado = jogoAdivinha.gerarNumero();
  
  function atualizarTentativa() {
    tentativaElem.innerHTML = `Tentativa${jogoAdivinha.tentativa > 1 ? 's' : ''} : <span style="color: blue">${jogoAdivinha.tentativa}</span>`;
  }
  
  function reiniciar() {
    btnVerifica.textContent = 'Verificar';
    status.textContent = '';
    chute.disabled = false;
    chute.value = '';
    jogoAdivinha.tentativa = 0;
    numeroSorteado = jogoAdivinha.gerarNumero();
    atualizarTentativa();
    btnVerifica.removeEventListener('click', reiniciar);
  }
  // a partir que a pessoa clicar no botao verificar
  formAdivinha.addEventListener('submit', function (event) {
    event.preventDefault();
  
    // verifica se o que a pessoa digitou é um numero
    const valorChute = parseInt(chute.value);
    if (isNaN(valorChute)) {
      status.innerHTML = '<span style="color:#FF3D00">Digite algum valor válido</span>';
      return;
    }
  
    jogoAdivinha.tentativa++;
    atualizarTentativa();
    
    // Vai comparar o numero que a pessoa jogou com o numero sorteado e se acertou aparecer a msg   
    if (valorChute === numeroSorteado) {
      status.innerHTML = '<span style="color:#00C853">Parabéns, você acertou!!</span>';
      chute.disabled = true;
      btnVerifica.textContent = "Jogue Novamente!";
      btnVerifica.addEventListener('click', reiniciar);
    } else {
      status.textContent = `O número sorteado é ${valorChute < numeroSorteado ? 'maior' : 'menor'}`;
    }
    //Vai limpar a cada tentativa que a pessoa jogar
    chute.value = '';
  });
  