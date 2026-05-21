const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/produtoController');

router.get('/estatisticas', ctrl.estatisticas);
router.get('/', ctrl.listar);
router.get('/:id', ctrl.buscar);
router.post('/', ctrl.criar);
router.put('/:id', ctrl.atualizar);
router.delete('/:id', ctrl.remover);

module.exports = router;