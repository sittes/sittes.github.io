class Usuario extends FirestoreObject {
    constructor(path, nome, sobreNome, email, telefone) {
        super(path);
        this.nome = nome;
        this.sobreNome = sobreNome;
        this.email = email;
        this.telefone = telefone;
    }
}