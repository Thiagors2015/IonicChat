import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { TranslateService } from 'ng2-translate';
import { Usuario } from '../models/usuario';
import { DatabaseProvider } from '../providers/database/database';
import { LoginproviderProvider } from '../providers/loginprovider/loginprovider';
import { AppModule } from './app.module';
import { ContaPage } from '../pages/conta/conta';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = LoginPage;
    
  constructor(platform: Platform, statusBar: StatusBar,
    splashScreen: SplashScreen,
    translateservice:TranslateService,
    public afAuth:AngularFireAuth,public loginprovider:LoginproviderProvider) {
    platform.ready().then(() => {
      
      splashScreen.hide();
      
      //localStorage.setItem("usedLanguage","pt_BR");
      translateservice.setDefaultLang("pt_BR");
      translateservice.use("pt_BR");
      //statusBar.styleDefault();
        
    });
  }

  Sair(){
      this.loginprovider.sair();
  }

  Abrir(pagina:string){
      if (pagina=='Conta'){
         this.navCtrl.push(ContaPage);
      }
  }

  

}
