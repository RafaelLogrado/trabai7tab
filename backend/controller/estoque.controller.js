const Estoque = require('../models/Estoque')

const cadastrar = async (req,res) => {
    const valores = req.body

    if (!valores.idProduto) {
        return res.status(400).json({message: "Preencha os campos obrigatórios!"})
    }

    try{
        await Estoque.create(valores)
        res.status(201).json({message: `Dados do estoque cadastrados com sucesso!`})
    }catch(err){
        res.status(500).json({message: `Não foi possível cadastrar o estoque!`})
        console.error(`Não foi possível cadastrar o estoque!`, err)
    }
}

const listar = async (req,res) => {
    try{
        const dados = await Estoque.findAll()
        res.status(200).json(dados)
    }catch(err){
        res.status(500).json({message: `Não foi possível listar os estoques!`})
        console.error(`Não foi possível listar os estoques!`, err)
    }
}

const atualizarCompleto = async (req,res) => {
    const valores = req.body
    const valor = req.params.id
    
    try{
        const estoque = await Estoque.findByPk(valor)
        if(estoque){
            await estoque.update(valores)
        }else{
            res.status(403).json({message: `Estoque não encontrado!`})
        }
        res.status(200).json({message: `Dados de estoque atualizados!`})
    }catch(err){
        res.status(500).json({message: `Não foi possível atualizar o estoque!`})
        console.error(`Não foi possível atualizar o estoque`)
    }
}

module.exports = { cadastrar, listar, atualizarCompleto }