const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/alunoController');
const { autenticar, autorizar } = require('../middleware/auth');

router.use(autenticar);

router.get('/', ctrl.listar);
router.get('/:id', ctrl.buscar);
router.post('/', autorizar('admin'), ctrl.criar);
router.put('/:id', autorizar('admin'), ctrl.atualizar);
router.delete('/:id', autorizar('admin'), ctrl.remover);

module.exports = router;