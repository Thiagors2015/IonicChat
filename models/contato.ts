export class Contato{
    uid:string;
    nome:string;
    fotoURL:string;

    constructor(uid:string,nome:string,fotoURL:string){
        this.uid=uid;
        this.nome=nome;
        this.fotoURL=fotoURL;
    }
}