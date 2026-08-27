const Entrega = require('../models/Entrega')

const cadastrar = async (req,res) => {
    const valores = req.body

    if (!valores.idPedido || !valores.cep || !valores.logradouro || !valores.bairro || !valores.localidade || !valores.uf || !valores.numero) {
        return res.status(400).json({message: "Preencha os campos obrigatórios!"})
    }

    try{
        await Entrega.create(valores)
        res.status(201).json({message: `Dados da entrega cadastrados com sucesso!`})
    }catch(err){
        res.status(500).json({message: `Não foi possível cadastrar a entrega!`})
        console.error(`Não foi possível cadastrar a entrega!`, err)
    }
}

const listar = async (req,res) => {
    try{
        const dados = await Entrega.findAll()
        res.status(200).json(dados)
    }catch(err){
        res.status(500).json({message: `Não foi possível listar as entregas!`})
        console.error(`Não foi possível listar as entregas!`, err)
    }
}

module.exports = { cadastrar, listar }