const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/cursoController');

router.get('/', ctrl.listar);
router.post('/', ctrl.criar);

module.exports = router;