let PRIMA_CARTA //undefined
let SECONDA_CARTA //undefined
let CARTE = document.querySelectorAll(".memory__card")
// let CARTE = document.getElementsByClassName("memory__card")

const flip = function (utenteCheClicca) {
  utenteCheClicca.target.classList.add("flipped")
  console.log("il valore di prima carta e': ", PRIMA_CARTA)
  if (PRIMA_CARTA === undefined) {
    //prima volta che clicchiamo
    PRIMA_CARTA = utenteCheClicca.target
  } else { //seconda volta che clicchiamo
    SECONDA_CARTA = utenteCheClicca.target
    for(let i = 0; i < CARTE.length; i++) {
        CARTE[i].removeAttribute("onclick")
    }
    console.log(PRIMA_CARTA, SECONDA_CARTA)
    setTimeout(function() {
        let sonoUguali = controllaElementi()
        if(sonoUguali === true) {
            PRIMA_CARTA.classList.replace("flipped", "match")
            SECONDA_CARTA.classList.replace("flipped", "match")
        } else {
            PRIMA_CARTA.classList.remove("flipped")
            SECONDA_CARTA.classList.remove("flipped")
        } 
        PRIMA_CARTA = undefined
        SECONDA_CARTA = undefined
        let carteDaMatchare = document.querySelectorAll(".memory__card:not(.match)")
        for(let i = 0; i < carteDaMatchare.length; i++) {
            // carteDaMatchare[i].addEventListener("click", flip)
            // carteDaMatchare[i].onclick = flip
            carteDaMatchare[i].setAttribute("onclick", "flip(event)")
            /*
                carteDaMatchare.addEventListener("click", function(event) {
                    ///....if, else robe varie
                    flip(event)
                })
            */
        }
        
        
    }, 1500)
    
  }
}


const controllaElementi = function() {
    if(PRIMA_CARTA.innerHTML === SECONDA_CARTA.innerHTML) {
        return true
    } else {
        return false
    }
}