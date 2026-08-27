const ItemPedido = require('../models/ItemPedido')

const cadastrar = async (req,res) => {
    const valores = req.body

    if (!valores.idPedido || !valores.idProduto || !valores.quantidade) {
        return res.status(400).json({message: "Preencha os campos obrigatórios!"})
    }

    try{
        await ItemPedido.create(valores)
        res.status(201).json({message: `Dados do pedido de item cadastrados com sucesso!`})
    }catch(err){
        res.status(500).json({message: `Não foi possível cadastrar o pedido de item!`})
        console.error(`Não foi possível cadastrar o pedido de item!`, err)
    }
}

const listar = async (req,res) => {
    try{
        const dados = await ItemPedido.findAll()
        res.status(200).json(dados)
    }catch(err){
        res.status(500).json({message: `Não foi possível listar os pedidos de itens!`})
        console.error(`Não foi possível listar os pedidos de itens!`, err)
    }
}

module.exports = { cadastrar, listar }