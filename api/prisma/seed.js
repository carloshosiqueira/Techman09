const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Inserir perfis
    await prisma.perfil.createMany({
        data: [
            { id: 1, perfil: 'Comum' },
            { id: 2, perfil: 'Administrador' },
            { id: 3, perfil: 'Técnico' },
            { id: 4, perfil: 'Gerente' },
        ],
    });

    // Inserir equipamentos
    await prisma.equipamento.createMany({
        data: [
            { id: 1, nome: "Torno Mecçnico 500mm Modelo BV20L 220V - TTM520 - Tander", descricao: 'Torno Mecânico 500mm Modelo BV20L 220V - TTM520 - Tander', imagem: 'Torno_Mecanico_500mm.png', ativo: true, data: new Date('2019-10-01T14:54:20.873Z') },
            { id: 2, nome: "Processador Intel Core i9-7920X Skylake, Cache 16.5MB, 2.9GHz (4.3GHz Max Turbo)",descricao: 'Processador Intel Core i9-7920X Skylake, Cache 16.5MB, 2.9GHz (4.3GHz Max Turbo), LGA 2066 - BX80673I97920X', imagem: 'Intel_Core_i9.png', ativo: true, data: new Date('2019-10-01T15:00:20.873Z') },
            { id: 3, nome: "Monitor, Dell, U2518D, UltraSharp, Preto e Suporte em Alumçnio, 25",descricao: 'Monitor, Dell, U2518D, UltraSharp, Preto e Suporte em Alumínio, 25"', imagem: 'Monitor_Dell.png', ativo: false, data: new Date('2018-10-01T10:00:20.000Z') },
            { id: 4, nome: "Mouse Gamer Razer Deathadder Essential optico 5 botões 4G 6.400 DPI",descricao: 'Mouse Gamer Razer Deathadder Essential óptico 5 Botões 4G 6.400 DPI', imagem: 'Mouse_Razer.png', ativo: true, data: new Date('2017-10-01T09:00:20.000Z') },
            { id: 5, nome: "All-in-One Media Keyboard",descricao: 'All-in-One Media Keyboard', imagem: 'Teclado_Microsoft.png', ativo: false, data: new Date('2017-10-01T13:00:00.000Z') },
        ],
    });

    // Inserir usuários
    await prisma.usuario.createMany({
        data: [
            { id: 1, senha: 111111, perfilId: 1 },
            { id: 2, senha: 212121, perfilId: 2 },
            { id: 3, senha: 313131, perfilId: 3 },
            { id: 4, senha: 414141, perfilId: 4 },
        ],
    });

    // Inserir comentários
    await prisma.comentario.createMany({
        data: [
            { id: 1, comentario: 'Deverá fazer o download do aplicativo da Razer para alterar a cor do mouse.', equipamentoId: 2, usuarioId: 4, data: new Date('2020-09-07T18:00:00.000Z') },
            { id: 2, comentario: 'Problema de aquecimento no processador após 1 ano de uso.', equipamentoId: 2, usuarioId: 2, data: new Date('2020-05-04T10:30:00.000Z') },
            { id: 3, comentario: 'Problema de aquecimento no processador após 3 anos de uso.', equipamentoId: 3, usuarioId: 4, data: new Date('2021-03-04T15:30:00.000Z') },
            { id: 4, comentario: 'Realizada a manutenção preventiva', equipamentoId: 3, usuarioId: 1, data: new Date('2021-06-05T09:30:00.000Z') },
            { id: 5, comentario: 'Realizada a manutenção corretiva', equipamentoId: 4, usuarioId: 1, data: new Date('2021-07-10T08:00:00.000Z') },
            { id: 6, comentario: 'Realizada a manutenção corretiva', equipamentoId: 5, usuarioId: 2, data: new Date('2021-07-13T09:00:00.000Z') },
            { id: 7, comentario: 'Realizada a manutenção corretiva', equipamentoId: 3, usuarioId: 2, data: new Date('2021-08-10T10:00:00.000Z') },
            { id: 8, comentario: 'Realizada a manutenção corretiva', equipamentoId: 4, usuarioId: 3, data: new Date('2021-09-18T17:00:00.000Z') },
            { id: 9, comentario: 'Realizada a manutenção corretiva', equipamentoId: 5, usuarioId: 3, data: new Date('2021-10-11T11:00:00.000Z') },
            { id: 10, comentario: 'Realizada a manutenção corretiva', equipamentoId: 3, usuarioId: 4, data: new Date('2021-11-21T12:00:00.000Z') },
            { id: 11, comentario: 'Realizada a manutenção corretiva', equipamentoId: 5, usuarioId: 4, data: new Date('2021-12-22T13:00:00.000Z') },
        ],
    });
}

main()
    .catch(e => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
