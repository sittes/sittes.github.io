class Venda{
    constructor(quantidade, precoUnitario, totalVenda,DataDeVenda,selecionarProduto){
          this.selecionarProduto = selecionarProduto;
          this.quantidade = quantidade;
          this.precoUnitario = precoUnitario;
          this.totalVenda = totalVenda;
          this.DataDeVenda = DataDeVenda;
          
    }
    toJson(){return JSON.parse(JSON.stringify(this));}
    parse(json){let nJson = JSON.parse(JSON.stringify(json));for(let k in nJson){if(k in this){this[k] = nJson[k];}}return this;}
  }