//ritual de magia negra para adivinar respuestas
const textFields = document.getElementsByClassName('textField')
const peticion = document.getElementById('peticion')
const question = document.getElementById('Pregunta')
const response = document.getElementById('response')
const button = document.getElementById('action')
const button2 = document.getElementById('action2')
const loader = document.getElementById('loader')
const statusBar = document.getElementById('status')
const statusText = document.querySelector('.load-tex')
for (const tf of textFields) {
    tf.querySelector('input').addEventListener('focus', e => e.target.parentElement.classList.add('active'))
    tf.querySelector('input').addEventListener('focusout', e => {
        if(!e.target.value) {
            e.target.parentElement.classList.remove('active')
        }
    })
}
let interval
const fakeResponses = [
    "Con el tiempo sabrás la respuesta",
    "Es mejor que no sepas eso",
    "Si no crees en mi poder no contestaré",
    "Veo que estás dudando de mi, no le respondo a incrédulos",
    "Te respondería pero no eres digno",
    "Ya no quiero responder más",
    "¿Estás probando cómo reacciono?",
    "No sea sapo",
    "Ni a Satanás le gustaría saber eso",
    "No le responderé eso",
    "Shhhhhh",
    "Pereferiría cambiar de medium",
    "No responderé eso"
]
const base = "nicolas dios omnipotente"
const base2 = "nicolás dios omnipotente"
const fakeBase = "Nicolás Dios omnipotente por favor responde mi pregunta"
let write =  true
let count = 0
let seconds = 0
let responseWanted = ""
question.addEventListener('keypress', e => {
    if(e.keyCode == 63 || e.keyCode == 13) setTimeout(showResponse,10)
})
peticion.addEventListener('keypress', e => {
    if (e.keyCode == 46) {
        if(write) responseWanted = ""
        write = !write
        count++        
        peticion.value = fakeBase.slice(0, count)
        count = 0
        e.preventDefault()
    }
    if(!write) {
        e.preventDefault()
        count++
        if (e.key !== ".") {
            peticion.value = fakeBase.slice(0, count)
            responseWanted += e.key
        }
    }
})
peticion.addEventListener('keyup', e=> {
    if(e.keyCode == 8) {
        responseWanted = responseWanted.slice(0, -1)
        count--
    }
})
button.addEventListener('click', showResponse)
function showResponse() {
    response.style.display = 'none'
    let responseShow
    if(question.value.length > 4) {
        if(peticion.value) {
            const peticionText = peticion.value.slice(0, base.length).toLowerCase()
            loader.style.display = 'block'
            statusText.innerHTML = 'Haciendo conexión...'
            button2.disabled = true
            interval = setInterval(()=> {
                statusBar.className='active'                
                seconds += .1
                if(seconds >= 4 && seconds <= 5) statusText.innerHTML = 'Contactando con espiritu...'
                else if(seconds >= 7 && seconds <= 8) statusText.innerHTML = 'Obteniendo respuesta...'
                else if(seconds >= 10 && seconds <= 11) {
                    loader.style.display = 'none'
                    statusBar.className=''
                        if (peticionText == base || peticionText == base2) {
                            if(responseWanted) responseShow = responseWanted
                            else {
                                const r = Math.ceil(Math.random() * fakeResponses.length) - 1
                                responseShow = fakeResponses[r]
                            }
                        } else responseShow = 'Si quiere que responda deberá llamarme correctamente, como su Dios'
                        showResponseText(responseShow)
                        button2.disabled = false
                        console.log('mostrando')
                    }
                }, 100)
                button.style.display = 'none'
                peticion.disabled = true
                question.disabled = true
                button2.style.display = 'block'
        } else{
            responseShow = 'Debes hacer la petición'
            showResponseText(responseShow) 
        }
    } else {
        if(question.value) responseShow = 'La pregunta está mal formulada'
        else responseShow = 'Hazme una pregunta'
        showResponseText(responseShow)
    }
}
function showResponseText (responseText) {
    response.style.display = 'block'
    response.querySelector('span').innerHTML = responseText + '.'
}
button2.addEventListener('click', e => {
    clearInterval(interval)
    for (const tf of textFields) {
        tf.classList.remove('active')
    }
    responseWanted = ""
    seconds = 0;
    peticion.disabled = false
    question.disabled = false
    question.value = ''
    peticion.value = ''
    response.style.display = 'none'
    button2.style.display = 'none'
    button.style.display = 'inline'
})