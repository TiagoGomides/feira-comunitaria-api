
module.exports = (err, req, res, next) => {

  console.error("ERRO DETECTADO");
  console.error("Mensagem:", err.message);
  console.error("Stack:", err.stack);
  let statusCode = err.statusCode || 500;
  let message = err.message || "Erro interno do servidor";

  if (err.name === 'ValidationError' || err.isJoi) {
    statusCode = 400;
    message = "Erro de validação dos dados enviados";
  }

  if (err.type === 'entity.parse.failed') {
    statusCode = 400;
    message = "JSON malformado na requisição";
  }

  if (err.code && err.code.startsWith("P")) {
    statusCode = 400;
    message = "Erro no banco de dados";
  }

  if (err.name === 'UnauthorizedError') {
    statusCode = 401;
    message = "Token de autenticação inválido";
  }

  if (err.name === 'ForbiddenError') {
    statusCode = 403;
    message = "Acesso negado";
  }

  
  const isDev = process.env.NODE_ENV !== "production";


  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
    ...(isDev && { stack: err.stack, raw: err }) // inclui detalhes extras só em dev
  });
};
