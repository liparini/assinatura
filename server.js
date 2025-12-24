const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const FILE = "assinaturas.json";

// salvar assinatura
app.post("/assinar", (req, res) => {
  const { documentoId, nome, assinatura } = req.body;

  let dados = [];
  if (fs.existsSync(FILE)) {
    dados = JSON.parse(fs.readFileSync(FILE));
  }

  dados.push({
    documentoId,
    nome,
    assinatura,
    data: new Date()
  });

  fs.writeFileSync(FILE, JSON.stringify(dados, null, 2));
  res.json({ ok: true });
});

// buscar assinaturas
app.get("/assinaturas/:id", (req, res) => {
  if (!fs.existsSync(FILE)) return res.json([]);

  const dados = JSON.parse(fs.readFileSync(FILE));
  const filtrado = dados.filter(d => d.documentoId === req.params.id);
  res.json(filtrado);
});

app.listen(3000, () =>
  console.log("✅ Backend rodando em http://localhost:3000")
);
