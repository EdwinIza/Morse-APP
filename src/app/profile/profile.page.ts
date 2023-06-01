import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AES, enc } from 'crypto-js';
import { Router } from '@angular/router';

interface UserData {
  nombre: string;
  apellido: string;
  cedula: string;
  email: string;
  // Agrega más propiedades según la estructura de tus datos de usuario
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  nombre: string = '';
  apellido: string = '';
  cedula: string = '';
  email: string = '';
  encryptedData: string = '';
  decryptedData: UserData | null = null;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
  ) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.firestore.collection<UserData>('users').doc(user.uid).get().subscribe(doc => {
          if (doc.exists) {
            const userData = doc.data() as UserData;
            this.nombre = userData.nombre;
            this.apellido = userData.apellido;
            this.cedula = userData.cedula;
            this.email = userData.email;
            // Asigna más datos del usuario a las propiedades de la clase según sea necesario
            this.encryptData(userData);
          }
        });
      }
    });
  }

  encryptData(data: UserData) {
    const dataString = JSON.stringify(data);
    const encrypted = AES.encrypt(dataString, 'my-secret-key').toString();
    this.encryptedData = encrypted;
  }
  
  decryptData() {
    const decrypted = AES.decrypt(this.encryptedData, 'my-secret-key').toString(enc.Utf8);
    this.decryptedData = JSON.parse(decrypted);
  }

  logout() {
    // Realiza el proceso de cierre de sesión aquí, como llamar a los métodos de AngularFireAuth
    // o cualquier otra lógica necesaria para el cierre de sesión.
    // Después de cerrar la sesión, redirige a la página de login.
    // Por ejemplo, puedes utilizar el método navigate de la clase Router:
  
    this.afAuth.signOut()
      .then(() => {
        this.router.navigate(['/login']); // Asegúrate de importar el Router en la parte superior del archivo
      })
      .catch(error => {
        console.log('Error al cerrar sesión:', error);
      });
  }
  

}


