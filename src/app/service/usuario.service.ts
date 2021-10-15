import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  buscaUsuarios(): Observable<any> {

    return this.http.get<any>(AppConstants.baseUrlUsuarios);
  }

  buscaUsuarioPorLogin(login: String) {
    return this.http.get<any>(AppConstants.baseUrlUsuarios + 'buscaUsuarioPorLogin/' + login);
  }

  buscaUsuarioPorPagina(pagina): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlUsuarios + 'page/' + pagina);
  }

  buscaUsuarioFiltroPorPagina(nome, pagina): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlUsuarios + 'buscaUsuarioPorNome/' + nome + '/page/' + pagina);
  }

  buscaUsuariosPorNome(nome: String): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlUsuarios + 'buscaUsuarioPorNome/' + nome);
  }

  deletarUsuario(id: Number): Observable<any> {
    return this.http.delete(AppConstants.baseUrlUsuarios + id, { responseType: 'text' })
  }

  cadastrarUsuario(usuario) {
    return this.http.post(AppConstants.baseUrlUsuarios, usuario, { responseType: 'text' });
  }

  validaLogin() {
    if (localStorage.getItem('token') !== null && localStorage.getItem('token').trim() !== null) {
      return true;
    }

    return false;
  }

}
