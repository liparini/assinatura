const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));

const assinaturas = [];

app.post("/assinaturas", (req, res) => {
    const { docId, nome, assinatura } = req.body;
    assinaturas.push({
        docId,
        nome,
        assinatura,
        data: new Date().toLocaleString()
    });
    res.json({ ok: true });
});

app.get("/assinaturas/:docId", (req, res) => {
    res.json(assinaturas.filter(a => a.docId === req.params.docId));
});

app.listen(3000, () =>
    console.log("Backend rodando em http://localhost:3000")
);
