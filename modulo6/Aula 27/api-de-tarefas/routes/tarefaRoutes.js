const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/tarefaController');
const validarTitulo = require('../middleware/validador');

router.get('/', ctrl.listar);
router.post('/', validarTitulo, ctrl.criar);
router.put('/:id', ctrl.atualizar);
router.delete('/:id', ctrl.remover);

module.exports = router;