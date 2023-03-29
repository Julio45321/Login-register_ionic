import { Usuario } from './../Models/Usuario';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private database = 'https://login2023-55979-default-rtdb.firebaseio.com/';
  private key = 'AIzaSyBPlzyLyAvfFhWaateBVUKJeeerbCRUnKA';
  private auth = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  userToken: String = '';
  constructor(private http: HttpClient) {}

  login(usuario: Usuario) {
    const authDatos = {
      ...usuario,
      returnSecureToken: true,
    };
    return this.http
      .post(`${this.auth}signInWithPassword?key=${this.key}`, authDatos)
      .pipe(
        map((resp: any) => {
          console.log(resp);
          this.almacenarToken(resp['idToken']);
          localStorage.setItem('uid', resp['localId']);
          return resp;
        })
      );
  }
  registrar(usuario: Usuario) {
    const authDatos = {
      ...usuario,
      returnSecureToken: true,
    };
    return this.http.post(`${this.auth}signUp?key=${this.key}`, authDatos).pipe(
      map((resp: any) => {
        console.log(resp);
        this.almacenarToken(resp['idToken']);
        localStorage.setItem('uid', resp['localId']);

        const datos = {
          ...usuario,
          tipo: 'normal',
          uid: resp['localId'],
        };
        this.http
          .post(`${this.database}usuarios.json`, datos)
          .subscribe((resp2) => {
            console.log(resp2);
          });
        return resp;
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
  }

  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token') || '';
    } else {
      this.userToken = '';
    }
  }

  autenticado(): boolean {
    if (this.userToken.length < 2) {
      return false;
    }
    let expira = Number(localStorage.getItem('expira'));
    let expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate > new Date()) {
      return true;
    } else {
      return false;
    }
  }

  private almacenarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds(3600);
    console.log(hoy);

    localStorage.setItem('expira', hoy.getTime().toString());
  }
}
