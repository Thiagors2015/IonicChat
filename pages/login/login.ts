import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Credencial} from '../../models/credencial';
import {RegistrarPage} from '../registrar/registrar';
import { LoginproviderProvider } from '../../providers/loginprovider/loginprovider';
import { ContatosPage } from '../contatos/contatos';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credencial=new Credencial;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public loginProvider:LoginproviderProvider) {
      this.initialize();
    }


    ionViewDidEnter(){
     /* this.menuCtrl.enable(false);
      this.menuCtrl.swipeEnable(false);*/
      
    }
  
  
    private initialize(){
      this.credencial = new Credencial();
    }
  
    ionViewDidLoad() {
      
      
      this.loginProvider.loginSucessoEventEmitter.subscribe(
        user=>{
          this.navCtrl.setRoot(TabsControllerPage)
        }
      );
      this.loginProvider.loginFalhaEventEmitter.subscribe(
        error=>console.log(error)
      )  
      this.loginProvider.logoutEventEmitter.subscribe(sair=>{
        this.navCtrl.setRoot(LoginPage);
      }
      );
         
    }
  
    loginComCredencial(){
      this.loginProvider.loginComCredencial(this.credencial);
    }
  
    loginComGoogle(){
      this.loginProvider.loginComGoogle();
    }
    doRegister(){
      this.navCtrl.push(RegistrarPage);
    }
  
    sair(){
      this.loginProvider.sair();
    }
  
    loginComFacebook(){
      this.loginProvider.loginComFacebook();
    }
  }
  