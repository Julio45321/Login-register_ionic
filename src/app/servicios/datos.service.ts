import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatosService {
  private API_URL = 'https://electrovalvula1-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) {}

  getValveState() {
    return this.http.get<boolean>(`${this.API_URL}/estado.json`);
  }

  updateValveState(estado: boolean) {
    return this.http.put<boolean>(`${this.API_URL}/estado.json`, estado);
  }
}
