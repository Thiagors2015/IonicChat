import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Usuario } from '../../models/usuario';
import { AppModule } from '../../app/app.module';
import { ContatosProvider } from '../../providers/contatos/contatos';

@IonicPage()
@Component({
  selector: 'page-conta',
  templateUrl: 'conta.html',
})
export class ContaPage {
  usuario:Usuario;
  constructor(public navCtrl: NavController, public navParams: NavParams,public contato:ContatosProvider) {
      this.initialize();

  }

  initialize() {
    if (this.navParams.get("contato")==undefined){
      this.usuario=AppModule.getUsuario();
    }else{
       this.usuario=this.navParams.get("contato"); 
    } 
  }

  Salvar(){
      this.contato.setUsuario({nome:this.usuario.nome});
      
  }

}
