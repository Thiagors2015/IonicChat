import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConversasPage } from '../conversas/conversas';
import { ContatosPage } from '../contatos/contatos';

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {

  tab1Root: any = ConversasPage;
  tab2Root: any = ContatosPage;
  constructor(public navCtrl: NavController) {
  }
  
}
