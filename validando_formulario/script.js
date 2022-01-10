//para o comportamento padrão ou seja enviar
let B7validador = {
    handleSubmit:(event) => {
        event.preventDefault();
    //pega todos os campos do fomulario que seja feita todas as verificações de sua rules
        let send = true;
    //pegar os input
        let inputs = form.querySelectorAll('input');

        B7validador.clearErros();

        for(let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let check =  B7validador.checkInput(input);
    //confere si tem data-rules
            if(check !== true) {
                send = false;
                //exibir erro
             B7validador.showErro(input, check);
            }
        }
        if(send){
            form.submit();
        }
    },
    
   //verifcar regras do input 
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');
        if(rules !== null){
            rules = rules.split('|');
            for(let k in rules){
                let rdetails = rules[k].split('=');
                //si tem algo prenchido ou não
                switch(rdetails[0]){
                    case 'required':
                        if(input.value == ''){
                            return 'campo vazio';
                        }
                        break;

                    case 'min':
                        if(input.value.length < rdetails[1]){
                            return 'campo tem que ter no minimo ' +rdetails[1]+ ' caracteres';
                        }
                        break;
                    case 'email':
                        if(input.value !=''){
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(!regex.test(input.value.toLowerCase()))
                            return 'email digitado não é valido';
                        }    
                }
            }
        }
        return true;
    },

    showErro:(input, error) => {
        input.style.borderColor = '#FF0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },

    clearErros:()=>{
        let inputs = form.querySelectorAll('input');
        for(let i=0; i < inputs.length;i++){
            inputs[i].style = "";
        }
        let errorElements = document.querySelectorAll('.error');
        for(let i=0; i < errorElements.length;i++){
            errorElements[i].remove();
        }
      
    }
};

// pegando a classe do fomulario
let form = document.querySelector('.b7validation');
//bloqueio do envvio ou seja e um validador do envio do formualio
form.addEventListener('submit',B7validador.handleSubmit);
