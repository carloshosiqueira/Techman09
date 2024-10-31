const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const read = async (req, res) => {
    const usuario = await prisma.usuario.findMany()
    res.status(200).json(usuario)
}

const login = async (req, res) => {
    const { senha } = req.body;
    const usuario = await prisma.usuario.findFirst({
        where: {
            senha: senha
        },
        include: {
            perfil: true
        }
    });

    if (!usuario) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
    }
    res.json(usuario);
}


module.exports = {
    read,
    login,
}