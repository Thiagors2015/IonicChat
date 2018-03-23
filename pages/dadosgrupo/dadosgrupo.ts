import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-dadosgrupo',
  templateUrl: 'dadosgrupo.html',
})
export class DadosgrupoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log(this.navParams.get("contatos"));
  }

  salvar(){
    
  }

}
