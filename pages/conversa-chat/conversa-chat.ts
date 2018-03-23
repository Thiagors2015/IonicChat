import { Component,NgZone} from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { ConversasProvider } from '../../providers/conversas/conversas';
import { Usuario } from '../../models/usuario';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { Mensagem } from '../../models/mensagem';
import { AppModule } from '../../app/app.module';
import { HttpModule } from '@angular/http';
import { DatabaseProvider } from '../../providers/database/database';
import { Platform } from 'ionic-angular/platform/platform';
import {Vibration} from '@ionic-native/vibration';

@Component({
  selector: 'page-conversa-chat',
  templateUrl: 'conversa-chat.html'
})
export class ConversaChatPage {
  tabBarElement: any;
  fab:any;
  envmensagem:string;
  contato:Usuario;
  mensagens:Array<Mensagem>;
  conversa_value;
  vazia:boolean;
  conversa_add;
  usuario:Usuario;
  constructor(public navCtrl: NavController,
    public navParams:NavParams,
    public conversaprovider:ConversasProvider,
    public viewcontrol:ViewController,
    public ngZone:NgZone,public http:HttpModule,
    public toast:ToastController,public db:DatabaseProvider,public platform:Platform,
  private vibration:Vibration) {
    
    this.vazia=false;
    this.usuario=AppModule.getUsuario();

    this.mensagens=new Array();

    this.fab=document.querySelector('.fab');
    this.fab.style.display='none';
    this.tabBarElement = document.querySelector('.tabbar');
    this.tabBarElement.style.display='none';
    this.contato= this.navParams.get('contato');
    if(!this.contato){
      this.viewcontrol.dismiss();
    }else{
      //this.mensagens=new Array();
      this.initialize();
    }

  } 
  ionViewWillUnload(){
    this.tabBarElement.style.display='flex';
    this.fab.style.display='flex';
  } 

  initialize() {
    /*
    * value - Escuta todas as alterações da referencia
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
    this.db.getAll(this.contato.uid).then(value=>this.mensagens=value);
    


    this.conversa_add=this.conversaprovider.getConversa(this.contato.uid);

    this.conversa_add.on('child_added', (snapshot) => {
      this.ngZone.run( () => {
        
        let data,hora,key,texto:string;
        
        let vfor,vfrom:Usuario;
        texto="";key=""; data=""; hora="";
            vfrom=undefined;
            vfor=undefined;
        snapshot.forEach(elemento => {
            if (elemento.key=="data"){
                data=elemento.val();
            }
            if (elemento.key=="for"){
                vfor=new Usuario(elemento.val().uid,elemento.val().nome,'','',elemento.val().fotoURL);
            }
            if (elemento.key=="from"){                
                vfrom=new Usuario(elemento.val().uid,elemento.val().nome,'','',elemento.val().fotoURL);

            }
            if (elemento.key=="hora"){
              hora=elemento.val();                

            }
            if (elemento.key=="key"){
              key=elemento.val(); 
            }
            if (elemento.key=="texto"){
              texto=elemento.val();
            }
            if (texto!="" && key!="" && vfrom!=undefined && vfor!=undefined && data!="" && hora!=""){
              let us=new Mensagem(key,vfrom,vfor,texto,data,hora);
            this.mensagens.push(us);
            texto="";key=""; data=""; hora="";
            vfrom=undefined;
            vfor=undefined;
              this.db.insert(us);
              this.vibration.vibrate(1000);
         
            } 

      })
      })
    });
/*
    this.conversa_value=this.conversaprovider.getConversa(this.contato.uid);

    this.conversa_value.on('value', (snapshot) => {
      this.ngZone.run( () => {
        this.mensagens=new Array();
      snapshot.forEach(elemento => {
      let existe=elemento.exists();
          if (existe){
            this.vibration.vibrate(1000);
            //console.log(elemento);
            let usu=new Usuario(elemento.val().for.uid,elemento.val().for.nome,'','',elemento.val().for.fotoURL);
            let usu2=new Usuario(elemento.val().from.uid,elemento.val().from.nome,'','',elemento.val().from.fotoURL);
            
            //console.log(usu);
            let us=new Mensagem(elemento.val().key,usu2,usu,elemento.val().texto,elemento.val().data,elemento.val().hora);
            this.mensagens.push(us);

          } 
      })
      })
    });*/
    }


  enviar(){
      
    if (this.envmensagem!=undefined && this.envmensagem!=""){
      let vdata=new Date();
      let dia,mes,hora,minuto;

      dia=vdata.getDate();
      if (dia<10){
        dia="0"+dia;
      }
      mes=vdata.getMonth()+1;
      if (mes<10){
        mes="0"+mes;
      }

      let data=dia+"/"+mes+"/"+vdata.getFullYear().toString();
      
      hora=vdata.getHours();
      if (hora<10){
        hora="0"+hora;
      }
      minuto=vdata.getMinutes();
      if (minuto<10){
        minuto="0"+minuto;
      }


      let horas = hora+":"+minuto ;
      
      
      let mens=new Mensagem(this.conversa_add.push().key,AppModule.getUsuario(),this.contato,this.envmensagem,data,horas);
      this.conversaprovider.setMensagem(this.contato.uid,mens);
      
      this.envmensagem="";
    }
  }
  
  
}
