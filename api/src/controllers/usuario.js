const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const read = async (req, res) => {
    const usuario = await prisma.usuario.findMany()
    res.status(200).json(usuario)
}

module.exports = {
    read,
}