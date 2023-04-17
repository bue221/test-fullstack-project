export const handleErrors = (error, req, res) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "id mal formateado" });
  } else {
    return res.status(500).send({ error: "error inesperado" });
  }
};
