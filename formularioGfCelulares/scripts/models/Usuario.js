class Usuario extends FirestoreObject {
    constructor(path, nome, sobreNome, email, telefone, contratosCount) {
        super(path);
        this.nome = nome;
        this.sobreNome = sobreNome;
        this.email = email;
        this.telefone = telefone;
        this.contratosCount = contratosCount || 0;
    }
}