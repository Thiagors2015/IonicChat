import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { AppModule } from '../../app/app.module';
import { DatabaseProvider } from '../database/database';
import { Mensagem } from '../../models/mensagem';
import { Usuario } from '../../models/usuario';

@Injectable()
export class ConversasProvider {

  banco;
  constructor(public http: HttpClient,public db:DatabaseProvider) {
      this.initialize();
  }
  initialize(){
        this.banco=firebase.database;    
  }



  getConversas(){
    return firebase.database().ref("/user/"+AppModule.getUsuario().uid+"/conversas/");
  }

  getConversa(contatoID){
      return firebase.database().ref("/user/"+AppModule.getUsuario().uid+"/conversas/"+contatoID);
  }
  setMensagem(contatoID,mensagem:Mensagem){
    
    firebase.database().ref("/user/"+AppModule.getUsuario().uid+"/conversas/"+contatoID).push(mensagem);
    firebase.database().ref("/user/"+contatoID+"/conversas/"+AppModule.getUsuario().uid).push(mensagem);
  }

  setAtualizarConversas(mensagem:Mensagem){
    
    /*this.db.getDB()
    .then((db1: SQLiteObject) => {
          db1.executeSql('Insert into mensagens(mensagem,usuario,contato,nomeCont,fotoCont,Data,situacao)'+
          ' values(?,?,?,?,?,?,?)',[mensagem.texto,mensagem.from,mensagem.for.uid,mensagem.for.nome,mensagem.for.fotoURL,new Date(),'2'])
    })
    .catch(e =>{
      alert(e); 
      console.log(e)
    });*/
  }

  deletarconversa(contatoID){
    firebase.database().ref("/user/"+AppModule.getUsuario().uid+"/conversas/"+contatoID+"").remove();
   }
}
