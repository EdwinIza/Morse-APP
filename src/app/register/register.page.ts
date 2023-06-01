import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  nombre: string = '';
  apellido: string = '';
  cedula: string = '';
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

  async register() {
    try {
      const credentials = await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      console.log('Usuario registrado correctamente:', credentials.user);

      if (credentials.user) {
        // Guardar datos adicionales del usuario en la base de datos
        await this.firestore.collection('users').doc(credentials.user.uid).set({
          nombre: this.nombre,
          apellido: this.apellido,
          cedula: this.cedula,
          email: this.email,
        });
        
        console.log('Datos adicionales guardados en la base de datos');
        this.showAlert('Éxito', 'Usuario registrado correctamente. Ahora puedes iniciar sesión.');
        this.router.navigate(['/login']);
      } else {
        console.error('No se ha obtenido el usuario');
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      this.showAlert('Error', 'No se pudo registrar el usuario. Verifica tus datos e intenta nuevamente.');
      // Manejar el error de registro y mostrar un mensaje de error en forma de alerta
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
