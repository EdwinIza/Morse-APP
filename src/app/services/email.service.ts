import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private readonly EMAIL_API_URL = 'https://56805718008-o9scf0ii6pnq90o5eu4ne6a767ro0e1h.apps.googleusercontent.com-email-api-url.com'; // URL de tu API de envío de correos electrónicos

  constructor(
    private afAuth: AngularFireAuth,
    private http: HttpClient
  ) { }

  sendEntryWordsEmail(email: string, subject: string, message: string): Promise<void> {
    const emailData = { email, subject, message };

    return this.http.post<void>(`${this.EMAIL_API_URL}/send-email`, emailData).toPromise()
      .then(() => {
        console.log('Correo electrónico enviado con éxito');
      })
      .catch((error) => {
        console.error('Error al enviar el correo electrónico:', error);
      });
  }
}
