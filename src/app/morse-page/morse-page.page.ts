import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EmailService } from '../services/email.service';
import { User } from '@firebase/auth-types';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-morse-page',
  templateUrl: './morse-page.page.html',
  styleUrls: ['./morse-page.page.scss'],
})
export class MorsePagePage implements OnInit {
  morseMessage: string = '';
  morseCodeMap: { [key: string]: string } = {
    'A': '.-',
    'B': '-...',
    'C': '-.-.',
    'D': '-..',
    'E': '.',
    'F': '..-.',
    'G': '--.',
    'H': '....',
    'I': '..',
    'J': '.---',
    'K': '-.-',
    'L': '.-..',
    'M': '--',
    'N': '-.',
    'O': '---',
    'P': '.--.',
    'Q': '--.-',
    'R': '.-.',
    'S': '...',
    'T': '-',
    'U': '..-',
    'V': '...-',
    'W': '.--',
    'X': '-..-',
    'Y': '-.--',
    'Z': '--..',
    '0': '-----',
    '1': '.----',
    '2': '..---',
    '3': '...--',
    '4': '....-',
    '5': '.....',
    '6': '-....',
    '7': '--...',
    '8': '---..',
    '9': '----.',
    '.': '.-.-.-',
    ',': '--..--',
    '?': '..--..',
    "'": '.----.',
    '!': '-.-.--',
    '/': '-..-.',
    '(': '-.--.',
    ')': '-.--.-',
    '&': '.-...',
    ':': '---...',
    ';': '-.-.-.',
    '=': '-...-',
    '+': '.-.-.',
    '-': '-....-',
    '_': '..--.-',
    '"': '.-..-.',
    '$': '...-..-',
    '@': '.--.-.',
    ' ': '/',
  };


  entryWords: string[] = ['HELLO', 'WORLD', 'MUNDO', 'CODE', 'MORSE','UPS','SOFTWARE','CALIDAD','CRIPTO'
                           ,'PROGRAMACION','HOLA','CIFRADO'];
  generatedCode: string = '';
  showTable: boolean = false; // Variable para controlar la visualización de la tabla
  morseCodeError: boolean = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private emailService: EmailService,
    private alertController: AlertController,
  ) {}

  ngOnInit() {
    this.generatedCode = this.generateRandomCode();
    this.showAlert('KeyWord Generada', this.generatedCode);
  }

  
  authenticateWithMorse() {
    const morseCodeArray = this.morseMessage.trim().split(' ');
    this.morseMessage = '';
    let translatedText = '';

    for (const morse of morseCodeArray) {
      for (const [letter, code] of Object.entries(this.morseCodeMap)) {
        if (code === morse) {
          translatedText += letter;
          break;
        }
      }
    }

    const correctText = this.generatedCode.toUpperCase();
    console.log(correctText);

    this.afAuth.currentUser
      .then((user: User | null) => {
        const email = user?.email;
        const subject = 'Palabras de entrada';
        const message = correctText;

        if (email) {
          this.emailService.sendEntryWordsEmail(email, subject, message)
            .then(() => {
              console.log('Correo electrónico enviado con éxito');
  
              if (user && translatedText === correctText) {
                console.log('Autenticación con código Morse exitosa');
                this.showAlert('Enhorabuena', 'Autenticación con código Morse exitosa');
                this.router.navigate(['/profile']);
              } else {
                console.log('Autenticación con código Morse fallida');
                this.showAlert('Error', 'Autenticación con código Morse fallida');
                this.router.navigate(['/login']);
              }
            })
            .catch((error) => {
              console.error('Error al enviar el correo electrónico:', error);
            });
        } else {
          console.error('El correo electrónico del usuario es indefinido');
        }
      })
      .catch((error) => {
        console.error('Error al obtener el usuario actual:', error);
      });
  }


  generateRandomCode(): string {
    const randomIndex = Math.floor(Math.random() * this.entryWords.length);
    return this.entryWords[randomIndex];
  }

  toggleTable() {
    this.showTable = !this.showTable; // Cambia el estado de la tabla al hacer clic en el botón
  }

  addMorseCode(code: string) {
    this.morseMessage += code;
  }

  async showAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  validateMorseCode() {
    const morseCodePattern = /^[-.\/\s]*$/; // Expresión regular para validar código Morse
    this.morseCodeError = !morseCodePattern.test(this.morseMessage);
  }
}

