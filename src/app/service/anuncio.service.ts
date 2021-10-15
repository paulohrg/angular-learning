import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Anuncio } from '../model/anuncio';
import { AppConstants } from '../app-constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnuncioService {

  constructor(private http: HttpClient) { }

  cadastrarAnuncio(anuncio: Anuncio) {
    return this.http.post(AppConstants.baseUrlAnuncios + localStorage.getItem('usuario'), anuncio);
  }
}
