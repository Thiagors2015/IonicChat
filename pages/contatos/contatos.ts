import { Component,NgZone, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { Usuario } from '../../models/usuario';
import { ContatosProvider } from '../../providers/contatos/contatos';
import { HttpModule } from '@angular/http';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { ConversaChatPage } from '../conversa-chat/conversa-chat';
import { AppModule } from '../../app/app.module';
import { Contato } from '../../models/contato';
import { ConversasProvider } from '../../providers/conversas/conversas';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ContaPage } from '../conta/conta';
import { CriargrupoPage } from '../criargrupo/criargrupo';


@Component({
  selector: 'page-contatos',
  templateUrl: 'contatos.html'
})
export class ContatosPage {
  tabBarElement: any;
    @ViewChild(Content) content: Content;
  contatos:Array<Usuario>;
  ListaContatos:Array<Usuario>;
  usuario:Usuario;
  constructor(public navCtrl: NavController,public contatoprovider:ContatosProvider,
  public ngZone:NgZone,public http:HttpModule,public toast:ToastController,
  public conversas:ConversasProvider,public alertCtrl:AlertController) {
    this.contatos=new Array();
    this.ListaContatos=new Array();
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
          this.ListaContatos=new Array();
          snapshot.forEach(elemento => {
          if (elemento.val().uid!=this.usuario.uid){ 
            let us=new Usuario(elemento.val().uid,elemento.val().nome,elemento.val().email,elemento.val().telefone,elemento.val().fotoURL);
            this.contatos.push(us);      
            this.ListaContatos.push(us);     
          }
      })
      })
    })
    }
    
    setConversa(contato){
    this.navCtrl.push(ConversaChatPage,{'contato' :contato});
    }

    setPesquisa(ev: any){
        this.ListaContatos=this.contatos;
        // set val to the value of the searchbar
        let val = ev.target.value;
    
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
          this.ListaContatos = this.ListaContatos.filter((item) => {
            return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
    }

    deletarConversa(contato){
        let confirm = this.alertCtrl.create({
          title: 'Exclusão',
          message: 'Deseja apagar todas as mensagens dessa conversa?',
          buttons: [
            {
              text: 'Cancelar',
              handler: () => {

              }
            },
            {
              text: 'Confirmar',
              handler: () => {
                this.conversas.deletarconversa(contato.uid);
               }
            }
          ]
        });
        confirm.present();
      
      
    } 

    verContato(contato){
        this.navCtrl.push(ContaPage,{"contato":contato});
    }

    newGrupo(){
      this.navCtrl.push(CriargrupoPage);
    }
}
