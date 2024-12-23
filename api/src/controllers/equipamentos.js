const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const read = async (req, res) => {
    try {
        if (req.params.id) {
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

const del = async (req, res) => {
    try {
        if (req.params.id) {
            const equipamento = await prisma.equipamento.delete({
                where: {
                    id: parseInt(req.params.id),
                },
            });
            if (!equipamento) {
                return res.status(404).json({ message: 'Equipamento não encontrado' });
            }
            return res.status(200).json({ message: 'Equipamento deletado com sucesso' });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Erro ao deletar equipamento' });
    }
}

module.exports = {
    read,
    create,
    del,
};
