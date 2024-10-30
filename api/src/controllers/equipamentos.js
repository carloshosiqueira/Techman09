const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const read = async (req, res) => {
    try {
        if (req.params.id) {
            // Busca um equipamento específico se o ID estiver definido
            const equipamento = await prisma.equipamento.findUnique({
                where: {
                    id: parseInt(req.params.id),
                },
            });

            if (!equipamento) {
                return res.status(404).json({ message: 'Equipamento não encontrado' });
            }
            return res.status(200).json(equipamento); // Retorna o equipamento encontrado
        }

        // Se não houver ID, busca todos os equipamentos
        const equipamentos = await prisma.equipamento.findMany();
        return res.status(200).json(equipamentos); // Retorna a lista de equipamentos

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao buscar equipamentos' });
    }
};

const create = async (req, res) => {
    try {
        const equipamento = await prisma.equipamento.create({
            data: req.body,
        });
        return res.status(201).json(equipamento);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao criar equipamento' });
    }
};

module.exports = {
    read,
    create,
};
