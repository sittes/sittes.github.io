class FirestoreObject{
    constructor(path){
        this.criarAtributoReferencial("path", false);
        this.path = path;
    }
    addInvisibleProperty(key){
        Object.defineProperty(this,key,{
            writable: true,
            configurable: true,
            enumerable: false,
        })
    }
    corrigirReferencia(value){
        if(typeof value === "string"){
            if(value[0] === "/"){
                value = value.substring(1,value.length);
            }
            if(value[value.length-1] === "/"){
                value = value.substring(0,value.length-1);
            }
        }
        return value;
    }
    criarAtributoReferencial(nome, enumeravel){
        let atributo;
        Object.defineProperty(this,nome,{
            configurable: true,
            enumerable: enumeravel ? true : false,
            get: ()=>{
                return atributo;
            },
            set: (value)=>{
                atributo = this.corrigirReferencia(value);
            }
        })
    }
    toJson(target){
        target = target instanceof Object ? target : this;
        let props = Object.getOwnPropertyNames(target);
        let simpleObject = JSON.parse(JSON.stringify(target));
        for(let i=0;i<props.length;i++){
            let prop = props[i];
            if(target[prop] instanceof Date){
                if(target[prop].getTime()){
                    simpleObject[prop] = target[prop].getTime();
                }
                
            }
            else if(target[prop] instanceof FirestoreObject){
                simpleObject[prop] = target[prop].toJson();
            }
            else if(target[prop] instanceof Array){
                for(let j=0;j<target[prop].length;j++){
                    let value = target[prop][j];
                    if(value instanceof Date){
                        if(value.getTime()){
                            simpleObject[prop][j] = value.getTime();
                        }
                    }
                    else if(value instanceof FirestoreObject){
                        simpleObject[prop][j] = value.toJson();
                    }
                    else if(value instanceof Object){
                        simpleObject[prop][j] = this.toJson(value);
                    }
                }
            }
            else if(target[prop] instanceof Object){
                simpleObject[prop] = this.toJson(target[prop]);
            }
        }
        return simpleObject;
    }
    parse(path, objetoGenerico){
        this.path = path;
        objetoGenerico = typeof objetoGenerico === "object" ? objetoGenerico : {}; 
        let propriedadesDoObjeto = Object.getOwnPropertyNames(objetoGenerico);
        for(let i=0; i<propriedadesDoObjeto.length; i++){
            if(this.hasOwnProperty(propriedadesDoObjeto[i])){
                if(objetoGenerico[propriedadesDoObjeto[i]] != undefined){
                    if(this[propriedadesDoObjeto[i]] instanceof Date){
                        this[propriedadesDoObjeto[i]] = new Date(objetoGenerico[propriedadesDoObjeto[i]]);
                    }
                    else if(typeof this[propriedadesDoObjeto[i]] === "number"){
                        let conv = parseFloat(objetoGenerico[propriedadesDoObjeto[i]]);
                        this[propriedadesDoObjeto[i]] = conv ? conv : 0;
                    }
                    else{
                        this[propriedadesDoObjeto[i]] = objetoGenerico[propriedadesDoObjeto[i]];
                    }
                }
            }
        }
        return this;
    }
}