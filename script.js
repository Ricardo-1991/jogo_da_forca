/*
2ª Botão de retornar para escolher outra categoria
*/

/*   OBJETO DE PALAVRAS ALEATÓRIAS */

let words = {
  fruits: [
    'ABACAXI',
    'TOMATE',
    'BANANA',
    'MAÇÃ',
    'LIMÃO',
    'LARANJA',
    'MELÃO',
    'MELANCIA',
    'AÇAI',
    'ABACATE',
    'MANGA',
    'PERA',
    'MAMÃO',
    'MORANGO',
    'UVA'
  ],
  objects: [
    'CAMISA',
    'CORTINA',
    'CELULAR',
    'COMPUTADOR',
    'CADEIRA',
    'BOLA',
    'LÁPIS',
    'MESA',
    'LIVRO',
    'CADERNO',
    'APONTADOR',
    'QUADRO',
    'TOALHA',
    'ESCOVA',
    'SHAMPOO'
  ],
  countrys: [
    'BRASIL',
    'CHILE',
    'CHINA',
    'ARGENTINA',
    'PERU',
    'ESTADOS UNIDOS',
    'ALEMANHA',
    'INGLATERRA',
    'ESPANHA',
    'FRANÇA',
    'JAPÃO',
    'CANADÁ',
    'PARAGUAI',
    'VENEZUELA',
    'EGITO'
  ]
}
l
let randomFruits = words.fruits[Math.floor(Math.random() * 2)]
let randomObjects = words.objects[Math.floor(Math.random() * 15)]
let randomCountrys = words.countrys[Math.floor(Math.random() * 15)]

/*   FUNÇÃO PARA CATEGORIAS ESCOLHIDAS */
categorias = () => {
  let selection = window.location.search
  selection = selection.replace('?', '') // Pegar o parâmetro sem a '?' no buscador

  if (selection == 'frutas') {
    return randomFruits
  } else if (selection == 'objetos') {
    return randomObjects
  } else if (selection == 'paises') {
    return randomCountrys
  }
}

/*   INICIO DE JOGO (FUNÇÃO gameStart EM ONLOAD NO HTML jogar.html) */
gameStart = () => {
  let randomWords = categorias()
  let chars = 'ÁÃÂÉÊÍÓÕÔÚ'
  console.log(randomWords)

  let setTry = document.querySelector('#tentativas')
  let totalTry = 6
  setTry.innerText = `Tentativas: ${totalTry}`
  let divGallows = document.querySelector('#div-forca')
  let letterTag = document.createElement('p')
  letterTag.setAttribute('type', 'text')
  letterTag.style.display = 'flex'
  letterTag.style.flexDirection = 'flex'
  letterTag.style.alignItems = 'center'

  /*   MASCARA PARA A PALAVRA ALEATÓRIA  */
  let mask = []
  for (let index in randomWords) {
    mask[index] = '_ '
  }
  letterTag.innerText = mask.join('')
  divGallows.appendChild(letterTag)

  /*   INICIA FUNÇÃO clickButton AO CLICAR NO EVENT 'onclick' NOS BOTÕES  */
  clickButton = (event, button) => {
    for (let index in randomWords) {
      // if (randomWords.includes(chars[index])) {
      //   var modButton = chars[index]
      // }

      /*   ACERTOU LETRA  */
      if (button == randomWords[index]) {
        mask[index] = button
        letterTag.innerText = mask.join('')
        rightClick(event)
      }
    }

    /*   ACERTOU PALAVRA COMPLETA POR LETRAS  */
    if (letterTag.innerText == randomWords) {
      youWin(letterTag, randomWords)
      setTimeout(() => {
        alert('Você venceu!')
        window.location.reload()
      }, 1000)
    }

    /*   ERROU LETRA */
    if (randomWords.indexOf(button) == -1) {
      wrongClick(event)
      setTry.innerText = `Tentativas: ${(totalTry -= 1)}`

      renderGallow(totalTry)
      if (totalTry == 0) {
        gameOver(letterTag, randomWords)
        setTimeout(() => {
          alert('Você perdeu')
          window.location.reload()
        }, 1000)
      }
    }
  }

  /*   ARRISCAR PALAVRA COMPLETA */
  riskWord = () => {
    let CompleteWord = document.querySelector('#palavraCompleta').value
    let turnUpper = CompleteWord.toUpperCase()
    if (turnUpper == '') {
      alert('Arrisque uma palavra!')
    } else {
      if (turnUpper == randomWords) {
        youWin(letterTag, randomWords)
        setTimeout(() => {
          alert('Parabéns, você venceu!')
          window.location.reload()
        }, 1000)
      } else {
        gameOver(letterTag, randomWords)
        document.querySelector('#imagem-forca').src =
          'assets/imagens/forca-6.png'
        setTimeout(() => {
          alert('Errou! Mais sorte da próxima vez :D !')
          window.location.reload()
        }, 1000)
      }
    }
  }
}

/*   FUNÇÕES CALLBACK */

pressEnter = event => {
  let press = event.keyCode
  if (press == 13) {
    alert('Clique no Botão - Arriscar! - ')
    event.preventDefault()
  }
}

wrongClick = event => {
  event.target.style.background = 'url(assets/imagens/x.jpg) no-repeat center'
  event.target.style.color = 'transparent'
  event.target.style.transition = 'all ease-out 0.5s'

  event.target.disabled = true
  const music = new Audio('tunes/POP.mp3')
  music.playbackRate = 1.5
  music.play()
}

renderGallow = totalTry => {
  let img = document.querySelector('#imagem-forca')

  switch (totalTry) {
    case 5:
      return (img.src = 'assets/imagens/forca-1.png')

    case 4:
      return (img.src = 'assets/imagens/forca-2.png')

    case 3:
      return (img.src = 'assets/imagens/forca-3.png')

    case 2:
      return (img.src = 'assets/imagens/forca-4.png')

    case 1:
      return (img.src = 'assets/imagens/forca-5.png')

    case 0:
      return (img.src = 'assets/imagens/forca-6.png')

    default:
      break
  }
}

gameOver = (letterTag, randomWords) => {
  letterTag.innerText = randomWords
  letterTag.style.textDecoration = 'line-through'
  letterTag.style.color = 'red'
  letterTag.style.transition = 'all 1.0s ease-in'
  let nodeList = document.querySelectorAll('.btn')
  for (let index in nodeList) {
    nodeList[index].disabled = true
  }
  const music = new Audio('tunes/gameOver.mp3')
  music.playbackRate = 1.0
  music.play()
}

rightClick = event => {
  const music = new Audio('tunes/rightClick3.mp3')
  music.playbackRate = 1.0
  music.play()
  event.target.style.background = 'green'
  event.target.style.transition = 'all 0.5s ease-in'
}

youWin = (letterTag, randomWords) => {
  letterTag.innerText = randomWords
  let nodeList = document.querySelectorAll('.btn')
  for (let index in nodeList) {
    nodeList[index].disabled = true
  }
  const music = new Audio('tunes/youWin.mp3')
  music.playbackRate = 1.0
  music.play()
}
