const Produto = require('../models/Produto')

const cadastrar = async (req,res) => {
    const valores = req.body

    if (!valores.idCategoria || !valores.nome || !valores.preco) {
        return res.status(400).json({message: "Preencha os campos obrigatórios!"})
    }

    try{
        await Produto.create(valores)
        res.status(201).json({message: `Dados do produtos cadastrados com sucesso!`})
    }catch(err){
        res.status(500).json({message: `Não foi possível cadastrar o produto!`})
        console.error(`Não foi possível cadastrar o produto!`, err)
    }
}

const listar = async (req,res) => {
    try{
        const dados = await Produto.findAll()
        res.status(200).json(dados)
    }catch(err){
        res.status(500).json({message: `Não foi possível listar os produtos!`})
        console.error(`Não foi possível listar os produtos!`, err)
    }
}

const buscarPorCod = async (req,res) => {
    const valor = req.params.id

    try{
        const dado = await Produto.findByPk(valor)

        if(dado){
            res.status(200).json(dado)
        }else{
            res.status(404).json({message: `produto com código ${valor} não encontrado!`})
        }
    }catch(err){
        res.status(500).json({message: `Não foi possível consultar o produto!`})
        console.error(`Não foi possível consultar o produto!`, err)
    }
}

const buscarPorNome = async (req,res) => {
    const valor = req.params.nome

    try{
        const dado = await Produto.findOne({where: {nome: valor}})

        if(dado){
            res.status(200).json(dado)
        }else{
            res.status(404).json({message: `produto com nome ${valor} não encontrado!`})
        }
    }catch(err){
        res.status(500).json({message: `Não foi possível consultar o produto!`})
        console.error(`Não foi possível consultar o produto!`, err)
    }
}

const atualizarCompleto = async (req,res) => {
    const valor = req.params.id
    const valores = req.body

    if (!valores.idCategoria || !valores.nome || !valores.preco) {
        return res.status(400).json({message: "Preencha os campos obrigatórios!"})
    }

    try{
        const dado = await Produto.findByPk(valor)

        if(dado){
            await dado.update(valores)
            res.status(200).json({message: `Dados do produto atualizados com sucesso!`})
        }else{
            res.status(404).json({message: `produto com código ${valor} não encontrado!`})
        }
    }catch(err){
        res.status(500).json({message: `Não foi possível atualizar o produto!`})
        console.error(`Não foi possível atualizar o produto!`, err)
    }
}

const atualizarParcial = async (req,res) => {
    const valor = req.params.id
    const valores = req.body

    if (!valores.idCategoria && !valores.nome && !valores.preco && !valores.imagem_url && !valores.descricao) {
        return res.status(400).json({message: "Preencha os campos obrigatórios!"})
    }

    try{
        const dado = await Produto.findByPk(valor)

        if(dado){
            await dado.update(valores)
            res.status(200).json({message: `Dados do produto atualizados com sucesso!`})
        }else{
            res.status(404).json({message: `produto com código ${valor} não encontrado!`})
        }
    }catch(err){
        res.status(500).json({message: `Não foi possível atualizar o produto!`})
        console.error(`Não foi possível atualizar o produto!`, err)
    }
}

const excluir = async (req,res) => {
    const valor = req.params.id

    try{
        const dado = await Produto.findByPk(valor)

        if(dado){
            await dado.destroy()
            res.status(200).json({message: `Dados do produto excluídos com sucesso!`})
        }else{
            res.status(404).json({message: `produto com código ${valor} não encontrado!`})
        }
    }catch(err){
        res.status(500).json({message: `Não foi possível excluir o produto!`})
        console.error(`Não foi possível excluir o produto!`, err)
    }
}

module.exports = { cadastrar, listar, buscarPorCod, buscarPorNome, atualizarCompleto, atualizarParcial, excluir }