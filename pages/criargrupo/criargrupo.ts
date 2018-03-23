import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Contato } from '../../models/contato';
import { ContatosProvider } from '../../providers/contatos/contatos';
import { Usuario } from '../../models/usuario';
import { AppModule } from '../../app/app.module';
import { DadosgrupoPage } from '../dadosgrupo/dadosgrupo';


@IonicPage()
@Component({
  selector: 'page-criargrupo',
  templateUrl: 'criargrupo.html',
})
export class CriargrupoPage {

contatos:Array<{estado:boolean,contato:Contato}>;
usuario:Usuario;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public contatoprovider:ContatosProvider,public ngZone:NgZone) {
      this.usuario=AppModule.getUsuario();
  }

  ionViewDidLoad() {
    /*value - Escuta todas as alterações da referencia
    * child_added - Ouvinte para quando um filtlo for adicionado
    * child_changed - Ouvinte para quando algum filtlo for alterado
    * child_removed - Ouvinte para quando algum filho for deletado
    * child_moved - Ouvinte para ouvir as mudanças na prioridade de um filho
    
    this.tarefaProvider.reference.on('child_removed', (snapshot) => {
    let tarefaRemovida = snapshot.val();
    this.toastCtrl.create({
    message: 'Tarefa '+tarefaRemovida.titulo+' removida!',
    duration: 3000
    }).present();
    })*/
    
    this.contatoprovider.banco.on('value', (snapshot) => {
      this.ngZone.run( () => {
          this.contatos=new Array();
          snapshot.forEach(elemento => {
          if (elemento.val().uid!=this.usuario.uid){ 
            let us=new Contato(elemento.val().uid,elemento.val().nome,elemento.val().fotoURL);
            this.contatos.push({estado:false,contato:us});           
          }
      })
      })
    })
    }

    selecionarContato(contato){
          contato.estado=!contato.estado;
    }

    avancar(){
      this.contatos = this.contatos.filter((item) => {
        return (item.estado=true);
      })
      this.navCtrl.push(DadosgrupoPage,{"contatos":this.contatos});
    }

}
