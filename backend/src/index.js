const express = require("express")
const {uuid, isUuid} = require('uuidv4');

const app = express();
app.use(express.json()) // para entender o body como json


const usuarios = []

function validateProjetcId(request, response, next){
    const { id } = request.params
    if(!isUuid(id)){
        return response.status(400).json({ error: 'Invalid project ID.' })
    }
    return next()
}

// app.use(logRequest)
// app.use('/projetos/:id', validateProjetcId)

app.get('/usuarios', (request, response) => {
    
    const { userName } = request.query;
    const results = userName
    ? usuarios.find(usuario => usuarios.userName.includes(userName))
    : usuarios

    return response.json(results)

})

app.post('/usuarios', (request, response) => {
    // const body = request.body;
    // console.log(body)

    const {userName, password} = request.body

    const usuario = {id:uuid(), userName, password}
    usuarios.push(usuario)

    return response.json(usuarios)
})

app.put('/usuarios/:id', validateProjetcId, (request, response) => {
    const { id } = request.params
    const {userName, password} = request.body
    const usuarioIndex = usuarios.findIndex(usuario => usuario.id === id)
    if(usuarioIndex < 0){
        return response.status(400).json({
            error: "Usuario não encontrado."
        })
    }

    const usuario = {
        id,
        userName,
        password
    }

    usuarios[usuarioIndex] = usuario

    return response.json(usuario)
})

app.delete('/usuarios/:id', validateProjetcId, (request, response) => {
    const { id } = request.params

    const usuarioIndex = usuarios.findIndex(usuario => usuario.id === id)
    if(usuarioIndex < 0){
        return response.status(400).json({
            error: "Usuario não encontrado."
        })
    }

    usuarios.splice(usuarioIndex,1)

    //status 204 pq esta retornando em branco
    return response.status(204).send()
})

 


app.listen('3333', () => {
    console.log('🚀 Back-end started!')
})