const Pedido = require('../models/Pedido')

const cadastrar = async (req,res) => {
    const valores = req.body

    if (!valores.idUsuario || !valores.valorSubtotal || !valores.valorFrete || !valores.valorTotal) {
        return res.status(400).json({message: "Preencha os campos obrigatórios!"})
    }

    try{
        await Pedido.create(valores)
        res.status(201).json({message: `Dados do pedido cadastrados com sucesso!`})
    }catch(err){
        res.status(500).json({message: `Não foi possível cadastrar o pedido!`})
        console.error(`Não foi possível cadastrar o pedido!`, err)
    }
}

const listar = async (req,res) => {
    try{
        const dados = await Pedido.findAll()
        res.status(200).json(dados)
    }catch(err){
        res.status(500).json({message: `Não foi possível listar os pedidos!`})
        console.error(`Não foi possível listar os pedidos!`, err)
    }
}

module.exports = { cadastrar, listar }