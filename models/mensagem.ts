import { Contato } from "./contato";
import { Usuario } from "./usuario";

export class Mensagem{
    key:string;
    from:Contato;
    for:Contato;
    texto:string;
    data:string;
    hora:string;

    constructor(pkey:string,pfrom:Usuario,pfor:Usuario,ptexto:string,pdt:string,ptime:string){
            this.key=pkey;
            let cont=new Contato(pfor.uid,pfor.nome,pfor.fotoURL);
            this.for=cont;
            let cont2=new Contato(pfrom.uid,pfrom.nome,pfrom.fotoURL);
            this.from=cont2;
            this.texto=ptexto;
            this.data=pdt;
            this.hora=ptime;
    }
    getFor():Contato{
        return this.for;
    }
    getFrom(){
        return this.from;
    }
   

}