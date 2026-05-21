const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');

/**
 * @openapi
 * components:
 * schemas:
 * Produto:
 * type: object
 * required:
 * - nome
 * - preco
 * - estoque
 * properties:
 * _id:
 * type: string
 * example: 6414b2b1f1a2c34567890123
 * nome:
 * type: string
 * example: Teclado Mecânico
 * preco:
 * type: number
 * example: 299.90
 * estoque:
 * type: integer
 * example: 25
 * securitySchemes:
 * bearerAuth:
 * type: http
 * scheme: bearer
 * bearerFormat: JWT
 */

/**
 * @openapi
 * /produtos:
 * get:
 * summary: Retorna a lista de todos os produtos
 * tags: [Produtos]
 * responses:
 * 200:
 * description: Lista de produtos retornada com sucesso
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Produto'
 * 500:
 * description: Erro interno do servidor
 */
router.get('/', async (req, res) => {
    try {
        const produtos = await Produto.find();
        res.json(produtos);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

/**
 * @openapi
 * /produtos:
 * post:
 * summary: Cria un novo produto (Requer Admin)
 * tags: [Produtos]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Produto'
 * responses:
 * 201:
 * description: Produto criado com sucesso
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Produto'
 * 400:
 * description: Dados informados são inválidos
 * 401:
 * description: Token ausente ou inválido
 */
router.post('/', async (req, res) => {
    try {
        const novoProduto = await Produto.create(req.body);
        res.status(201).json(novoProduto);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
});

/**
 * @openapi
 * /produtos/{id}:
 * delete:
 * summary: Remove um produto pelo ID (Requer Admin)
 * tags: [Produtos]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: ID gerado pelo MongoDB do produto a ser removido
 * responses:
 * 200:
 * description: Produto removido com sucesso
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * mensagem:
 * type: string
 * example: Removido com sucesso
 * 401:
 * description: Token ausente ou inválido
 * 404:
 * description: Produto não encontrado
 */
router.delete('/:id', async (req, res) => {
    try {
        const produto = await Produto.findByIdAndDelete(req.params.id);
        if (!produto) return res.status(404).json({ erro: 'Não encontrado' });
        res.json({ mensagem: 'Removido com sucesso' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

module.exports = router;