import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoService {

  
  apiUrl = 'https://clientes.api.greenborn.com.ar/public-random-word?c=3';

  constructor(private http: HttpClient) { }

  getRandomWord(){
    
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });

    return this.http.get<any>(this.apiUrl, { headers });
  }
  
}
