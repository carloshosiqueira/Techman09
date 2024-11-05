const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const read = async (req, res) => {
    try {
        if (req.params.id) {
            // Busca um comentário específico se o ID estiver definido
            const comentario = await prisma.comentario.findUnique({
                where: {
                    id: parseInt(req.params.id),
                },
            });

            if (!comentario) {
                return res.status(404).json({ message: 'Comentário não encontrado' });
            }
            return res.status(200).json(comentario); // Retorna o comentário encontrado
        }

        // Se não houver ID, busca todos os comentários
        const comentarios = await prisma.comentario.findMany();
        return res.status(200).json(comentarios); // Retorna a lista de comentários

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao buscar comentários' });
    }
};

const readComentarioByEquipamentoId = async (req, res) => {
    try {
        // Alterando a consulta para ordenar os comentários pela data, mais recentes primeiro
        const comentarios = await prisma.comentario.findMany({
            where: {
                equipamentoId: parseInt(req.params.equipamentoId),
            },
            include: {
                usuario: { 
                    select: {
                        perfil: true,
                    },
                },
            },
            orderBy: {
                data: 'desc',
            },
        });

        return res.status(200).json(comentarios);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao buscar comentários do equipamento' });
    }
};



const create = async (req, res) => {
    try {
        const { comentario, usuarioId, equipamentoId } = req.body;

        if (!comentario || comentario.trim() === '') {
            return res.status(400).json({ error: 'Comentário não pode ser vazio!' });
        }

        const novoComentario = await prisma.comentario.create({
            data: {
                comentario: comentario.trim(),
                data: new Date().toISOString(),
                usuarioId,
                equipamentoId,
            },
        });

        return res.status(201).json(novoComentario);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao criar comentário' });
    }
};


module.exports = {
    read,
    readComentarioByEquipamentoId,
    create,
};
