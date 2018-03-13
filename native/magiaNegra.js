const textFields = document.getElementsByClassName('textField')
const peticion = document.getElementById('peticion')
const question = document.getElementById('Pregunta')
const response = document.getElementById('response')
const button = document.getElementById('action')
const button2 = document.getElementById('action2')
for (const tf of textFields) {
    tf.querySelector('input').addEventListener('focus', e => e.target.parentElement.classList.add('active'))
    tf.querySelector('input').addEventListener('focusout', e => {
        if(!e.target.value) {
            e.target.parentElement.classList.remove('active')
        }
    })
}
const fakeResponses = [
    "Con el tiempo sabrás la respuesta",
    "Es mejor que no sepas eso",
    "Si no crees en mi poder no contestaré",
    "Veo que estás dudando de mi, no le respondo a incrédulos",
    "Te respondería pero no eres digno",
    "Ya no quiero responder más, hijueputa cansón",
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
let responseWanted = ""
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
        if (e.key !== ".") {
            count++
            peticion.value = fakeBase.slice(0, count)
            responseWanted += e.key
        }
    }
})
peticion.addEventListener('keyup', e=> {
    if(e.keyCode == 8) responseWanted = responseWanted.slice(0, -1)
})
button.addEventListener('click', showResponse)
function showResponse() {
    let responseShow
    if(question.value.length > 8) {
        if(peticion.value) {
            const peticionText = peticion.value.slice(0, base.length).toLowerCase()
            if (peticionText == base || peticionText == base2) {
                if(responseWanted) {
                    responseShow = responseWanted
                } else {
                    const r = Math.ceil(Math.random() * fakeResponses.length) - 1
                    responseShow = fakeResponses[r]
                }
                button.style.display = 'none'
                peticion.disabled = true
                question.disabled = true
                button2.style.display = 'block'
            } else responseShow = 'Si quiere que responda deberá llamarme correctamente, como su Dios'
        } else responseShow = 'Debes hacer la petición'
    } else {
        if(question.value) responseShow = 'La pregunta está mal formulada'
        else responseShow = 'Hazme una pregunta'
    }
    response.style.display = 'block'
    response.querySelector('span').innerHTML = responseShow + '.'
}