import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginproviderProvider } from '../../providers/loginprovider/loginprovider';
import { Credencial } from '../../models/credencial';


@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage {

  credencial:Credencial;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loginprovider:LoginproviderProvider) {
      this.initialize();
  }

  initialize(){
    this.credencial=new Credencial();
  }
  doRegister(){
    this.loginprovider.registrarUsuario(this.credencial);
   }

}
