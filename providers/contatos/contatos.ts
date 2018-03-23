import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import firebase from 'firebase';
import { AppModule } from '../../app/app.module';


@Injectable()
export class ContatosProvider {
  
  banco;
  constructor(public http: HttpClient) {
      this.initialize();     
  }

  initialize(){
    this.banco=firebase.database().ref("/users");
  }
  setpesquisar(contato:string){
    return firebase.database().ref("/users/").child("nome").equalTo(contato);
  }

  setUsuario(usu){
      firebase.database().ref("/users/").child(AppModule.getUsuario().uid).update(usu);
  }
}
