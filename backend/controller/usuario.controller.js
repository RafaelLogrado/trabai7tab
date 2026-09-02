const Usuario = require('../models/Usuario')
const { hashPassword, comparePassword } = require("../service/bcrypt.service")

const cadastrar = async (req,res) => {
    const valores = req.body

    if (!valores.nome || !valores.email || !valores.senha || !valores.telefone || !valores.cpf) {
        return res.status(400).json({message: "Preencha os campos obrigatórios!"})
    }

    
    try{
        const senhaHash = await hashPassword(valores.senha)

        valores.senha = senhaHash

        await Usuario.create(valores)
        res.status(201).json({message: `Dados do usuários cadastrados com sucesso!`})
    }catch(err){
        res.status(500).json({message: `Não foi possível cadastrar o usuário!`})
        console.error(`Não foi possível cadastrar o usuário!`, err)
    }
}

const listar = async (req,res) => {
    try{
        const dados = await Usuario.findAll()
        res.status(200).json(dados)
    }catch(err){
        res.status(500).json({message: `Não foi possível listar os usuários!`})
        console.error(`Não foi possível listar os usuários!`, err)
    }
}

const buscarPorCod = async (req,res) => {
    const valor = req.params.id

    try{
        const dado = await Usuario.findByPk(valor)

        if(dado){
            res.status(200).json(dado)
        }else{
            res.status(404).json({message: `Usuário com código ${valor} não encontrado!`})
        }
    }catch(err){
        res.status(500).json({message: `Não foi possível consultar o usuário!`})
        console.error(`Não foi possível consultar o usuário!`, err)
    }
}

const buscarPorNome = async (req,res) => {
    const valor = req.params.nome

    try{
        const dado = await Usuario.findOne({where: {nome: valor}})

        if(dado){
            res.status(200).json(dado)
        }else{
            res.status(404).json({message: `Usuário com nome ${valor} não encontrado!`})
        }
    }catch(err){
        res.status(500).json({message: `Não foi possível consultar o usuário!`})
        console.error(`Não foi possível consultar o usuário!`, err)
    }
}

const atualizarCompleto = async (req,res) => {
    const valor = req.params.id
    const valores = req.body

    if (!valores.nome || !valores.email || !valores.senha || !valores.telefone || !valores.cpf) {
        return res.status(400).json({message: "Preencha os campos obrigatórios!"})
    }

    try{
        const dado = await Usuario.findByPk(valor)

        if(dado){
            await dado.update(valores)
            res.status(200).json({message: `Dados do usuário atualizados com sucesso!`})
        }else{
            res.status(404).json({message: `Usuário com código ${valor} não encontrado!`})
        }
    }catch(err){
        res.status(500).json({message: `Não foi possível atualizar o usuário!`})
        console.error(`Não foi possível atualizar o usuário!`, err)
    }
}

const atualizarParcial = async (req,res) => {
    const valor = req.params.id
    const valores = req.body

    if (!valores.nome || !valores.email || !valores.senha || !valores.telefone || !valores.cpf) {
        return res.status(400).json({message: "Preencha os campos obrigatórios!"})
    }

    try{
        const dado = await Usuario.findByPk(valor)

        if(dado){
            await dado.update(valores)
            res.status(200).json({message: `Dados do usuário atualizados com sucesso!`})
        }else{
            res.status(404).json({message: `Usuário com código ${valor} não encontrado!`})
        }
    }catch(err){
        res.status(500).json({message: `Não foi possível atualizar o usuário!`})
        console.error(`Não foi possível atualizar o usuário!`, err)
    }
}

const excluir = async (req,res) => {
    const valor = req.params.id

    try{
        const dado = await Usuario.findByPk(valor)

        if(dado){
            await dado.destroy()
            res.status(200).json({message: `Dados do usuário excluídos com sucesso!`})
        }else{
            res.status(404).json({message: `Usuário com código ${valor} não encontrado!`})
        }
    }catch(err){
        res.status(500).json({message: `Não foi possível excluir o usuário!`})
        console.error(`Não foi possível excluir o usuário!`, err)
    }
}

module.exports = { cadastrar, listar, buscarPorCod, buscarPorNome, atualizarCompleto, atualizarParcial, excluir }