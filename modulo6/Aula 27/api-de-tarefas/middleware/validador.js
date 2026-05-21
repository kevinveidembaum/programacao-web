function validarTitulo(req, res, next) {
    if (!req.body.titulo || req.body.titulo.trim() === "") {
        const erro = new Error("O campo título é obrigatório.");
        erro.status = 400;
        return next(erro);
    }
    next();
}

module.exports = validarTitulo;