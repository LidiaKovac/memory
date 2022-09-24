const CARDS = [
  {
    icon: "🐵",
    "data-icon": "monkey",
  },
  {
    icon: "🐵",
    "data-icon": "monkey",
  },
  {
    icon: "🐶",
    "data-icon": "dog",
  },
  {
    icon: "🐶",
    "data-icon": "dog",
  },
  {
    icon: "🦊",
    "data-icon": "fox",
  },
  {
    icon: "🦊",
    "data-icon": "fox",
  },
  {
    icon: "🦝",
    "data-icon": "racoon",
  },
  {
    icon: "🦝",
    "data-icon": "racoon",
  },
  {
    icon: "🐱",
    "data-icon": "cat",
  },
  {
    icon: "🐱",
    "data-icon": "cat",
  },
  {
    icon: "🐯",
    "data-icon": "tiger",
  },
  {
    icon: "🐯",
    "data-icon": "tiger",
  },
  {
    icon: "🐴",
    "data-icon": "horse",
  },
  {
    icon: "🐴",
    "data-icon": "horse",
  },
  {
    icon: "🦄",
    "data-icon": "unicorn",
  },
  {
    icon: "🦄",
    "data-icon": "unicorn",
  },
  {
    icon: "🐮",
    "data-icon": "cow",
  },
  {
    icon: "🐮",
    "data-icon": "cow",
  },
  {
    icon: "🐷",
    "data-icon": "pig",
  },
  {
    icon: "🐷",
    "data-icon": "pig",
  },
  {
    icon: "🦒",
    "data-icon": "giraffe",
  },
  {
    icon: "🦒",
    "data-icon": "giraffe",
  },
  {
    icon: "🐹",
    "data-icon": "hamster",
  },
  {
    icon: "🐹",
    "data-icon": "hamster",
  },
  {
    icon: "🐻",
    "data-icon": "bear",
  },
  {
    icon: "🐻",
    "data-icon": "bear",
  },
  {
    icon: "🐨",
    "data-icon": "koala",
  },
  {
    icon: "🐨",
    "data-icon": "koala",
  },
  {
    icon: "🐼",
    "data-icon": "panda",
  },
  {
    icon: "🐼",
    "data-icon": "panda",
  },
  {
    icon: "🐔",
    "data-icon": "chicken",
  },
  {
    icon: "🐔",
    "data-icon": "chicken",
  },
].sort(() => Math.random() - 0.5)

let FIRST_CARD
let SECOND_CARD

let POINTS = 0
let ERRORS = 0
// let COUNTER = 0

//utils
const countFlipped = () => {
  return document.querySelectorAll(".front").length
}

const flipBackAll = () => {
  let allCards = document.querySelectorAll(".memory__card")
  allCards.forEach((card) => {
    card.classList.replace("front", "back")
    card.children[0].classList.add("hidden")
  })
}

const blockCards = () => {
  document
    .querySelectorAll(".memory__card")
    .forEach((card) => (card.onclick = () => {}))
}
const setupCards = () => {
  document
    .querySelectorAll(".memory__card")
    .forEach((card) => (card.onclick = flip))
}

//game
const initGame = (ev) => {
  setTimeout(()=> {
    console.log(ev)
    ev.target.remove()
    let cont = document.querySelector(".memory__container")
    cont.innerHTML = ""
    for (let i = 0; i < CARDS.length; i++) {
      let curr = CARDS[i]
      cont.innerHTML += `<div class='memory__card back' onclick='flip(event)' data-icon='${curr["data-icon"]}'> ${curr.icon}  </div>`
    }
  },700)
  
}

const flip = (ev) => {
  //change color of card
  let selectedCard = ev.target
  ev.stopPropagation()
  selectedCard.classList.replace("back", "front")

  //flip back after 1.5 secs
  setTimeout(() => {
    selectedCard.classList.replace("front", "back")
  }, 1500)

  if (countFlipped() >= 2) {
    blockCards()
    let frontCards = document.querySelectorAll(".front")
    console.log(frontCards)
    FIRST_CARD = frontCards[0]
    SECOND_CARD = frontCards[1]
    checkCards()
    setTimeout(() => {
      setupCards()
    }, 1500)
  }
  if (POINTS >= 16) {
    document.querySelector(
      ".memory__container"
    ).innerHTML = `<div> <h1>YOU WON!</h1> <div>  <button onclick="initGame(event)">START!</button>`
  }
  if (ERRORS >= 5) {
    document.querySelector(
      ".memory__container"
    ).innerHTML = `<div> <h1>YOU LOST!</h1> <div> <button onclick="initGame(event)">START!</button>`
  }
}

const checkCards = () => {
  // console.log(FIRST_CARD.getAttribute("data-icon"),SECOND_CARD.getAttribute("data-icon"))
  if (
    FIRST_CARD.getAttribute("data-icon") ===
    SECOND_CARD.getAttribute("data-icon")
  ) {
    ;[FIRST_CARD, SECOND_CARD].forEach((card) => {
      card.removeAttribute("onclick")
      card.classList = ["memory__card solved"]
    })
    console.log(POINTS)
    POINTS++
  } else {
    ERRORS++
  }
}
