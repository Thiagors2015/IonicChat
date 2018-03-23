import { Injectable, EventEmitter, NgZone } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Credencial } from '../../models/credencial';
import {AngularFireAuth} from 'angularfire2/auth';
import { Usuario } from '../../models/usuario';
import firebase from 'firebase';
import { AppModule } from '../../app/app.module';
import { LoginPage } from '../../pages/login/login';
@Injectable()
export class LoginproviderProvider {

  public usuario:Usuario;
  autenticado:boolean;
  loginSucessoEventEmitter:EventEmitter<any>;
  loginFalhaEventEmitter:EventEmitter<any>;
  logoutEventEmitter:EventEmitter<any>;

  constructor(public http: HttpModule,public ngZone:NgZone,public afAuth:AngularFireAuth) {
        this.loginSucessoEventEmitter=new EventEmitter();
        this.loginFalhaEventEmitter=new EventEmitter();
        this.logoutEventEmitter=new EventEmitter();
        
       
        
        this.afAuth.auth.onAuthStateChanged(usuario=>{
         this.callbackStateChange(usuario);
        })
         
  }
  
  public callbackStateChange(usuario){
  this.ngZone.run(()=>{
      if (usuario==null){
          this.autenticado=false;
          AppModule.setUsuario(new Usuario('','','','',''));
      }else{
            
          let prov=usuario.providerData[0];
          AppModule.setUsuario(new Usuario(prov.uid,prov.displayName,prov.email,prov.phoneNumber,prov.photoURL));
          firebase.database().ref("/users/").child(AppModule.getUsuario().uid).update(AppModule.getUsuario());
          this.loginSucessoEventEmitter.emit(usuario);
      }
  })
}
loginComCredencial(credencial:Credencial){
    this.afAuth.auth.signInWithEmailAndPassword(credencial.email,credencial.senha)
    .then(resultado=>{
      this.callbackSucessoLogin(resultado);})
    .catch(error=>{
      alert(error);
      this.callbackFalhaLogin(error);})
}

registrarUsuario(credencial:Credencial){
     this.afAuth.auth.createUserWithEmailAndPassword(credencial.email,credencial.senha)
      .then(result=>console.log(result))
      .catch(error=>console.log(error));
}

private callbackSucessoLogin(response){
  let prov=response.user.providerData[0];
  AppModule.setUsuario(new Usuario(prov.uid,prov.displayName,prov.email,prov.phoneNumber,prov.photoURL));
  firebase.database().ref("/users/").child(AppModule.getUsuario().uid).update(AppModule.getUsuario());
  this.loginSucessoEventEmitter.emit(response.user);
}


private callbackFalhaLogin(error){
  this.loginFalhaEventEmitter.emit({ code : error.code,message:error.message,email:error.email,credencial:error.credencial});
}

loginComGoogle(){
  let provider=new firebase.auth.GoogleAuthProvider();
try{
      this.afAuth.auth.signInWithRedirect(provider)
      .then(resultado=>this.callbackSucessoLogin(resultado))
      .catch(error=>{
        
        this.callbackFalhaLogin(error)
      
      });
}catch(e){
  alert(e);
}
}

sair(){
    this.afAuth.auth.signOut()
    .then(()=>{
          //this.navCtrl.setRoot(LoginPage);
          this.logoutEventEmitter.emit(true)    
    })
    .catch(error=>this.callbackFalhaLogin(error))
}

loginComFacebook(){
try{ 
  let provider=new firebase.auth.FacebookAuthProvider();
  this.afAuth.auth.signInWithRedirect(provider)
      .then((credential) =>  {
        this.callbackSucessoLogin(credential);
      })
      .catch(error => {alert(error);console.log(error.message)});
  
}catch(e){
  alert(e.message);
}
}


}
