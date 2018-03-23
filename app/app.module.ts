import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ConversasPage } from '../pages/conversas/conversas';
import { ContatosPage } from '../pages/contatos/contatos';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { ConversaChatPage } from '../pages/conversa-chat/conversa-chat';
import {LoginPage} from '../pages/login/login';
import { DatePipe } from '@angular/common';


import {RegistrarPage} from '../pages/registrar/registrar';
import {Http,HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from 'ng2-translate';
import firebase from 'firebase';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireModule} from 'angularfire2';
import { LoginproviderProvider } from '../providers/loginprovider/loginprovider';
import { Usuario } from '../models/usuario';
import { ConversasProvider } from '../providers/conversas/conversas';
import { ContatosProvider } from '../providers/contatos/contatos';  
import { DatabaseProvider } from '../providers/database/database';
import {ContaPage} from '../pages/conta/conta';
import {CriargrupoPage} from '../pages/criargrupo/criargrupo';
import {DadosgrupoPage} from '../pages/dadosgrupo/dadosgrupo';
import {Vibration} from '@ionic-native/vibration';
import { IonicStorageModule } from '@ionic/storage';

var firebaseconfig = {
  apiKey: "AIzaSyAJo9ZM0gg8mPldaD8-2He89RvrP84A92E",
  authDomain: "chat-thiago.firebaseapp.com",
  databaseURL: "https://chat-thiago.firebaseio.com",
  projectId: "chat-thiago",
  storageBucket: "chat-thiago.appspot.com",
  messagingSenderId: "916509232179"
};


export function createTranslateLoder(http:Http){
  return new TranslateStaticLoader(http,'./assets/i18n','.json');
}


@NgModule({
  declarations: [
    MyApp,
    ConversasPage,
    ContatosPage,
    TabsControllerPage,
    ConversaChatPage,
    LoginPage,
    RegistrarPage,
    ContaPage,
    CriargrupoPage,
    DadosgrupoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,    
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      provide:TranslateLoader,
      useFactory:(createTranslateLoder),
      deps:[Http]
    }),
    AngularFireModule.initializeApp(firebaseconfig), 
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ConversasPage,
    ContatosPage,
    TabsControllerPage,
    ConversaChatPage,
    LoginPage,
    RegistrarPage,
    ContaPage,
    CriargrupoPage,
    DadosgrupoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginproviderProvider,
    ConversasProvider,
    ContatosProvider,    
    DatabaseProvider,
    Vibration,
     DatePipe

  ]
})
export class AppModule {
  static tabBarElement: any;
   private static usuario:Usuario;
   constructor(){      
      firebase.initializeApp(firebaseconfig);
   }

   static getUsuario():Usuario{
      return this.usuario;
   }
   static setUsuario(usu:Usuario){
      this.usuario=usu;
      this.tabBarElement = document.querySelector('#nome-usuario');
      this.tabBarElement.innerHTML=usu.nome;
      this.tabBarElement = document.querySelector('#imagem-usuario');
      this.tabBarElement.src=usu.fotoURL;
   }
 
   

}