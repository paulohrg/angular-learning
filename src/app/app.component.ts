import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from './service/login-service.service';
import { Router } from '@angular/router';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioService } from './service/usuario.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Curso-Angular-REST';



  constructor(private router: Router, private usuarioService: UsuarioService) {
  }

  ngOnInit(): void {

    if (localStorage.getItem('token') == null || localStorage.getItem('token').trim() == null) {
      var path = window.location.pathname;
      if (path !== "/home" && path !== "/login" && path !== "/cadastrarUsuario") {
        this.router.navigate(['login']);
      }
    }
  }

  public validarMenu() {
    return !this.usuarioService.validaLogin();
  }

  public sair() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
