//importaçoes do pacote
const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const fs = require('fs');

// copilar e codificar o json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configuração de cabeçalho
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Origin');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

// como acesso especifico para um servidor
app.use(cors({
    credentials: true,
    origin: true
}));

app.options('*', cors());

app.get("/db", function(req, res){
    const { id } = req.params;

    const db = JSON.parse(fs.readFileSync('./db.json', 'utf8'));

    res.json(db);
});

// criação de convocações
app.get("/produtos/:id", function(req, res){
    const { id } = req.params;

    const db = JSON.parse(fs.readFileSync('./db.json', 'utf8'));
    let resultados = db["produtos"].filter(v => v.categoria_id === Number(id));

    res.json(resultados.length <= 0 ? [""] : resultados);
});
      
app.get("/categorias", function(req, res){
    const db = JSON.parse(fs.readFileSync('./db.json', 'utf8'));
    res.json(db["categorias"]);
});

app.get("/servico", function(req, res){
    const db = JSON.parse(fs.readFileSync('./db.json', 'utf8'));
    res.json(db["servico"]);
});


// para retorna erro si o servidor não existir
app.get("/*", function(req, res){
    res.json({error: "Convocação inválida!"});
});

// iniciar o servidor 
const port = process.env.PORT || 8080;

const server = app.listen(port, ()=>{
    console.log(`Server is running http://localhost:${port}`);
});


const localtunnel = require('localtunnel');

(async () => {
  const tunnel = await localtunnel({ port: port, subdomain: "crypto-trader-api" });

  console.log(tunnel.url);

  tunnel.on('close', () => {
    console.log("Tunnel closed!");
  });
})();
