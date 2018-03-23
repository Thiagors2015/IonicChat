import { Injectable } from '@angular/core';
 import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { Mensagem } from '../../models/mensagem';
import { Contato } from '../../models/contato';
import { Usuario } from '../../models/usuario';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { AppModule } from '../../app/app.module';

 
 @Injectable()
 export class DatabaseProvider {
    
  constructor(private storage: Storage, private datepipe: DatePipe) { }
 
  public insert(mens: Mensagem) {
    //let key = this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");
    if (mens.for.uid==AppModule.getUsuario().uid){
      return this.save(mens.from.uid+"#"+mens.key, mens);
    }else{
      return this.save(mens.for.uid+"#"+mens.key, mens);
    }
  }
 
  public update(mens: Mensagem) {
    return this.save(mens.key,mens);
  }
 
  private save(key: string, mens: Mensagem) {
    return this.storage.set(key, mens);
  }
 
  public remove(key: string) {
    return this.storage.remove(key);
  }
 
  public getAll(pContato_ID:string) {
 
    let mensagens=new Array();
 
    return this.storage.forEach((value: Mensagem, key: string, iterationNumber: Number) => {
      if (key.indexOf(pContato_ID+"#")>-1){
        let mensa=value;
        mensagens.push(mensa);
      }
    })
    .then(() => {
        return mensagens;
    })
    .catch((error) => {
        return Promise.reject(error);
    });
  }
} 