class Contrato{
    constructor(nome, sobreNome, email, bairro, endereco, telefone, aparelho, modelo, serial, 
                tipoAcessorio, serialAcessorios, defeitodeClarado, dataDeOrcamento, dataDeEntrega, valor, 
                tecnico, assinaturaDoTecnico,assinaturaDoCliente){
          this.nome= nome;
          this.sobreNome = sobreNome;
          this.email = email;
          this.bairro = bairro;
          this.endereco = endereco;
          this.telefone = telefone;
          this.aparelho = aparelho;
          this.modelo = modelo;
          this.serial = serial;
          this.tipoAcessorio = tipoAcessorio;
          this.defeitodeClarado = defeitodeClarado;
          this.dataDeOrcamento = dataDeOrcamento;
          this.dataDeEntrega = dataDeEntrega;
          this.valor = valor;
          this.tecnico = tecnico;
          this.assinaturaTecnico = assinaturaDoTecnico;
          this.assinaturaDoCliente = assinaturaDoCliente;
          this.serialAcessorios = serialAcessorios;
          

    }
    toJson(){return JSON.parse(JSON.stringify(this));}
    parse(json){let nJson = JSON.parse(JSON.stringify(json));for(let k in nJson){if(k in this){this[k] = nJson[k];}}return this;}
  }