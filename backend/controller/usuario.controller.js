const Usuario = require('../models/Usuario')

const cadastrar = async (req,res) => {
    const valores = req.body

    if (!valores.nome || !valores.email || !valores.senha || !valores.telefone || !valores.cpf || !valores.identidade || !valores.tipo_usuario) {
        return 
    }

    try{

    }catch(err){
        
    }
}