const express = require("express")
const app = express()
const cors = require("cors")

const hostname = 'localhost'
const PORT = 3000
const conn = require("./db/conn")

const usuarioController = require("./controller/usuario.controller")
const produtoController = require("./controller/produto.controller")
const categoriaController = require("./controller/categoria.controller")
const pedidoController = require("./controller/pedido.controller")
const estoqueController = require("./controller/estoque.controller")
// const relatVwController = require("./controller/relatVW.controller")

// ---------- Middleware ----------

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

// ---------- Rotas ----------

// Rotas públicas
app.get('/', (req, res) => {
    res.status(200).json({message: "Teste de aplicação rodando"})
})

// app.post('/login', authController.login)
app.post('/usuario', usuarioController.cadastrar)

app.get('/produtos', produtoController.listar)
app.get('/produto/:id', produtoController.buscarPorCod)

app.get('/categorias', categoriaController.listar)


// Rotas privadas

// app.use(authMiddleware)

app.get('/usuarios/perfil', usuarioController.buscarPorCod)
app.put('/usuarios/:id', usuarioController.atualizarCompleto)
app.patch('/usuarios/:id', usuarioController.atualizarParcial)

app.post('/pedidos', pedidoController.cadastrar)
app.get('/pedidos/meus-pedidos', pedidoController.listar)

app.post('/produtos', produtoController.cadastrar)
app.put('/produtos/:id', produtoController.atualizarCompleto)
app.patch('/produtos/:id', produtoController.atualizarParcial)
app.delete('/produtos/:id', produtoController.excluir)

app.post('/estoque', estoqueController.cadastrar)
// app.put('/estoque/:id', estoqueController.atualizarCompleto)

// app.get('/relatorios/vendas', relatVwController.vendas)
// app.get('/relatorios/estoque', relatVwController.estoque)


// ---------- Server ----------
conn.sync()
.then(() => {
    app.listen(PORT, hostname, () => {
        console.log(`Aplicação rodando em http://${hostname}:${PORT}`)
    })
})
.catch((err) => {
    console.error("Erro ao tentar conexão com banco de dados", err)
})