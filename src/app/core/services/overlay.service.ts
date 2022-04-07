import { Injectable } from '@angular/core';
import { AlertController, AlertOptions, LoadingController, ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class OverlayService {


  constructor( private alertCtrl: AlertController, private loadingCtrl: LoadingController, private toastCtrl: ToastController ) {
  }

  async alert(options?: AlertOptions): Promise<HTMLIonAlertElement> {
    const alert = await this.alertCtrl.create(options);
    await alert.present();
    return alert;
  }

  async loading(options?: any): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingCtrl.create({
      message : 'Loading...',
      ...options
    });
    await loading.present();
    return loading;
  }

  async toast(message: string, duration: number = 2000, position: 'top' | 'bottom' = 'bottom'): Promise<HTMLIonToastElement> {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      position
    });
    await toast.present();
    return toast;
  }
}


