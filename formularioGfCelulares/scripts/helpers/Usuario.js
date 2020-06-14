window.logout = function(){
    return new Promise(async (resolve,reject)=>{
        multiStorager.DataStorager.eraseAll();
        firebase.auth().signOut()
        .then(resolve).catch(reject);
    });
}

window.getUser = function(){
    return new Promise(async (resolve,reject)=>{
        if(multiStorager.DataStorager.get("usuario")){
            resolve(multiStorager.DataStorager.get("usuario"));
            return;
        }
        const currentUser = firebase.auth().currentUser;
        if(currentUser){
            let snap = await firebase.database().ref("Usuarios").child(currentUser.uid).once("value").catch(err=>{console.log(err)});
            if(snap){
                let usuario = new Usuario().parse(snap.ref.path.toString(), snap.val());
                multiStorager.DataStorager.set("usuario", usuario);
                resolve(usuario);
            }
            else{
                reject();
            }
        }
        else{
            firebase.auth().onAuthStateChanged( async (user)=>{
                if(user){
                    let snap = await firebase.database().ref("Usuarios").child(user.uid).once("value").catch(err=>{console.log(err)});
                    if(snap){
                        let usuario = new Usuario().parse(snap.ref.path.toString(), snap.val());
                        multiStorager.DataStorager.set("usuario",usuario);
                        resolve(usuario);
                    }
                    else{
                        reject();
                    }
                }
                else{
                    reject();
                }
            })
        }
    });
}

window.signIn = function(email, senha){
    return new Promise(function(resolve,reject){
        firebase.auth().signInWithEmailAndPassword(email, senha)
        .then(function(userRec){
            var path = userRec.user.uid;
            firebase.database().ref("Usuarios").child(path).once("value")
            .then(function(user){
                var usuario = new Usuario().parse(user.ref.path.toString(), user.val());
                resolve(usuario);
            })
            .catch(reject);
        })
        .catch(reject);
    });
}

window.criarUsuario = function(usuario, senha){
    return new Promise(function(resolve,reject){
        firebase.auth().createUserWithEmailAndPassword(usuario.email, senha)
        .then(function(userRec){
            var path = userRec.user.uid;
            firebase.auth().signOut().catch(console.log);
            firebase.database().ref("Usuarios").child(path).set(usuario.toJson())
            .then(function(){
                usuario.path = path;
                resolve(usuario);
            })
            .catch(function(err){
                reject(usuario);
            });
        })
        .catch(function(err){
            reject(usuario);
        });
    });
}