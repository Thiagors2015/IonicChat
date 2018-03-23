export class Usuario {
    public uid:string;
    public nome:string;
    public email:string;
    public telefone:string;
    public fotoURL:string;

    constructor(uid:string,nome:string,email:string,telefone:string,foto:string){
        this.email=email;
        this.fotoURL=foto;
        this.nome=nome;
        this.telefone=telefone;
        this.fotoURL=foto;
        this.uid=uid;
    }
    getUsuario(){
        return this;    
    }
    getUltMensagem(){
        return {texto:localStorage.getItem("mensagem"+this.uid),dtregistro:localStorage.getItem("mensagem_data"+this.uid),hora:localStorage.getItem("mensagem_hora"+this.uid)}
    }
}