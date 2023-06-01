import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';
 
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  async login() {
    try {
      const credentials = await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      console.log('Usuario autenticado correctamente:', credentials.user);

      if (credentials.user) {
        // Obtener datos adicionales del usuario desde la base de datos
        this.firestore.collection('users').doc(credentials.user.uid).get()
          .subscribe((doc) => {
            if (doc.exists) {
              const userData = doc.data();
              console.log('Datos adicionales del usuario:', userData);
              // Realizar acciones adicionales después de obtener los datos, como guardar el estado de inicio de sesión, etc.
              this.router.navigate(['/morse-page']);
            } else {
              console.error('Datos adicionales del usuario no encontrados');
              // Manejar el caso cuando no se encuentren los datos adicionales del usuario
            }
          });
      } else {
        console.error('No se ha obtenido el usuario');
      }
    } catch (error) {
      console.error('Error al autenticar el usuario:', error);
      this.showAlert('Error', 'No se pudo iniciar sesión. Verifica tus credenciales e intenta nuevamente.');
      // Manejar el error de autenticación y mostrar un mensaje de error en forma de alerta
    }
  }

  async showAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
