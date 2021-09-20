//importaciones

const express = require ('express')
const app = express()
const {
    insertarCurso,
    consultarCursos,
    editCurso,
    deleteCurso
} = require('./consulta')

// Server
app.listen(3000, () => console.log('Servidor encendido en puerto 3000'))
app.use(express.static("public"))

//ruta api
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/curso", async (req, res) => {
    let body = "";
    req.on('data', (chunk) => {
        body += chunk
    })
    //eso es que lo que llegue (por post) lo va poniendo en el body
    req.on('end', async () => {
        const datos = Object.values(JSON.parse(body))
        const respuesta = await insertarCurso(datos)
        res.send(JSON.stringify(respuesta))
    })
})
app.get("/cursos", async (req, res) => {
    const registros = await consultarCursos()
    res.send(JSON.stringify(registros))

})

app.put("/curso", async (req, res) => {
    let body = "";
    req.on('data', (chunk) => {
        body += chunk;
    })
    req.on('end', async () => {
        const datos = Object.values(JSON.parse(body))
        const respuesta = await editCurso(datos)
        res.end(JSON.stringify(respuesta))

    })
})

app.delete("/curso/:nombre", async (req, res) => {
    const {nombre}= req.params
    const registro = await deleteCurso(nombre)
    res.send(JSON.stringify(registro))
})