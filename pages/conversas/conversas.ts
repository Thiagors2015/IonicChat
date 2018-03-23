import { Component,NgZone } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Mensagem } from '../../models/mensagem';
import { ConversasProvider } from '../../providers/conversas/conversas';
import { Usuario } from '../../models/usuario';
import { ConversaChatPage } from '../conversa-chat/conversa-chat';
import { Contato } from '../../models/contato';
import { Platform } from 'ionic-angular/platform/platform';
import { AppModule } from '../../app/app.module';
import firebase from 'firebase';
import { ContaPage } from '../conta/conta';
import { CriargrupoPage } from '../criargrupo/criargrupo';
import { DatabaseProvider } from '../../providers/database/database';

@Component({
  selector: 'page-conversas',
  templateUrl: 'conversas.html'
})
export class ConversasPage {

  conversas; 
  usuario:Usuario;    
  contatos:Array<Usuario>;
  ListaContatos:Array<Usuario>;
  constructor(public navCtrl: NavController,public ngZone:NgZone,
  public platform:Platform,public conversasprovider:ConversasProvider,
  public alertCtrl:AlertController,public db:DatabaseProvider) {
    this.contatos=new Array();
    this.ListaContatos=new Array();
    this.usuario=AppModule.getUsuario();
  }

  ionViewDidLoad() {
    this.conversas=this.conversasprovider.getConversas().orderByChild("from");

    this.conversas.on('value', (snapshot) => {
      this.ngZone.run( () => {
        this.contatos=new Array();
        this.ListaContatos=new Array();
        let from:string;
      snapshot.forEach(elemento => {
          elemento.forEach(elementos => {
             
            if (this.usuario.uid==elementos.val().from.uid){
                  from=elementos.val().for.uid;
                  if (this.filtrarArray(this.contatos,from).length==0){
                    let us=new Usuario(elementos.val().for.uid,elementos.val().for.nome,elementos.val().for.email,
                    elementos.val().for.telefone,elementos.val().for.fotoURL);
                    
                    let mens=new Mensagem(elementos.val().key,elementos.val().from,elementos.val().for,
                    elementos.val().texto,elementos.val().data,elementos.val().hora)

                    this.db.insert(mens);

                    
                    this.contatos.push(us);
                    this.ListaContatos.push(us);
                    
                    localStorage.setItem("mensagem"+elementos.val().for.uid,elementos.val().texto);
                    localStorage.setItem("mensagem_hora"+elementos.val().for.uid,elementos.val().hora);
                    localStorage.setItem("mensagem_data"+elementos.val().for.uid,elementos.val().data);
                  }else{
                    let mens=new Mensagem(elementos.val().key,elementos.val().from,elementos.val().for,
                    elementos.val().texto,elementos.val().data,elementos.val().hora)
                    this.db.insert(mens);
                    localStorage.setItem("mensagem"+elementos.val().for.uid,elementos.val().texto);
                    localStorage.setItem("mensagem_hora"+elementos.val().for.uid,elementos.val().hora);
                    localStorage.setItem("mensagem_data"+elementos.val().for.uid,elementos.val().data);
                  }

             }else{
                  from=elementos.val().from.uid;
                  if (this.filtrarArray(this.contatos,from).length==0){
                    let us=new Usuario(elementos.val().from.uid,elementos.val().from.nome,elementos.val().from.email,elementos.val().from.telefone,elementos.val().from.fotoURL);
                    this.contatos.push(us);
                    this.ListaContatos.push(us);
                    
                    let mens=new Mensagem(elementos.val().key,elementos.val().from,elementos.val().for,
                    elementos.val().texto,elementos.val().data,elementos.val().hora)

                    this.db.insert(mens);
                    localStorage.setItem("mensagem"+elementos.val().from.uid,elementos.val().texto);
                    localStorage.setItem("mensagem_hora"+elementos.val().from.uid,elementos.val().hora);
                    localStorage.setItem("mensagem_data"+elementos.val().from.uid,elementos.val().data);
                  }else{
                    let mens=new Mensagem(elementos.val().key,elementos.val().from,elementos.val().for,elementos.val().texto,elementos.val().data,elementos.val().hora)

                    this.db.insert(mens);
                    localStorage.setItem("mensagem"+elementos.val().from.uid,elementos.val().texto);
                    localStorage.setItem("mensagem_hora"+elementos.val().from.uid,elementos.val().hora);
                    localStorage.setItem("mensagem_data"+elementos.val().from.uid,elementos.val().data);
                  }

              }
        })

      })
      })
    });
   
  
  }

    setConversa(contato:Contato){
      let usuario=new Usuario(contato.uid,contato.nome,'','',contato.fotoURL);
      this.navCtrl.push(ConversaChatPage,{'contato' :usuario});
  
    }

    filtrarArray(array,contat) {
      return array.filter(function(val) {
        return val.uid === contat;  
      });
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
