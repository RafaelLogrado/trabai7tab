const Categoria = require('../models/Categoria')

const cadastrar = async (req,res) => {
    const valores = req.body

    if (!valores.nome || !valores.categoria) {
        return res.status(400).json({message: "Preencha os campos obrigatórios!"})
    }

    try{
        await Categoria.create(valores)
        res.status(201).json({message: `Dados da categoria cadastrados com sucesso!`})
    }catch(err){
        res.status(500).json({message: `Não foi possível cadastrar a categoria!`})
        console.error(`Não foi possível cadastrar a categoria!`, err)
    }
}

const listar = async (req,res) => {
    try{
        const dados = await Categoria.findAll()
        res.status(200).json(dados)
    }catch(err){
        res.status(500).json({message: `Não foi possível listar as categorias!`})
        console.error(`Não foi possível listar as categorias!`, err)
    }
}

module.exports = { cadastrar, listar }