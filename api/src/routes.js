const express = require("express");
const router = express.Router();

//Sempre que procurado com id eu recebo o seguinte erro

// node:_http_outgoing:659
//     throw new ERR_HTTP_HEADERS_SENT('set');
//           ^

// Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
//     at ServerResponse.setHeader (node:_http_outgoing:659:11)
//     at ServerResponse.header (C:\Users\Desenvolvimento\Desktop\Techman09\api\node_modules\express\lib\response.js:794:10)
//     at ServerResponse.send (C:\Users\Desenvolvimento\Desktop\Techman09\api\node_modules\express\lib\response.js:174:12)
//     at ServerResponse.json (C:\Users\Desenvolvimento\Desktop\Techman09\api\node_modules\express\lib\response.js:278:15)
//     at read (C:\Users\Desenvolvimento\Desktop\Techman09\api\src\controllers\comentario.js:18:21) {
//   code: 'ERR_HTTP_HEADERS_SENT'
// }

// Node.js v20.15.1
// [nodemon] app crashed - waiting for file changes before starting...

const Comentario = require('./controllers/comentario')
const Equipamento = require('./controllers/equipamentos')
const Usuario = require('./controllers/usuario')

router.get('/comentario', Comentario.read)
router.get('/comentario/:id', Comentario.read)
router.post('/comentario', Comentario.create)

router.post('/equipamento', Equipamento.create)
router.get('/equipamento', Equipamento.read)
router.get('/equipamento/:id', Equipamento.read)

router.get('/', (req, res) => { return res.json("API respondendo") });

module.exports = router