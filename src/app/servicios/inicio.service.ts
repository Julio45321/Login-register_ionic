import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InicioService {
  private API_URL = 'https://electrovalvula1-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) {}

  getProgressBar() {
    return this.http.get(`${this.API_URL}/datos.json`);
  }
}
