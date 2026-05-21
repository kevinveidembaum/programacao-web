const jwt = require('jsonwebtoken');

const autenticar = (req, res, next) => {
    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({ erro: 'Token não fornecido' });
    }

    const token = header.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    } catch (erro) {
        res.status(401).json({ erro: 'Token inválido' });
    }
};

const autorizar = (...rolesPermitidas) => {
    return (req, res, next) => {
        if (!rolesPermitidas.includes(req.userRole)) {
            return res.status(403).json({ erro: 'Acesso negado: privilégios insuficientes' });
        }
        next();
    };
};

module.exports = { autenticar, autorizar };