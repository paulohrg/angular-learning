import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { LoginServiceService } from 'src/app/service/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginServiceService, private usuarioService: UsuarioService, private router: Router) { }

  usuario = { login: '', senha: '' };
  msg = '';

  public login() {
    this.loginService.login(this.usuario).subscribe(data => {
      /*Corpo do retorno http */
      var token = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1];

      localStorage.setItem('token', token);

      this.usuarioService.buscaUsuarioPorLogin(this.usuario.login).subscribe(data => {
        localStorage.setItem('usuario', data.id);
      });

      this.router.navigate(['areaRestrita']);

    },
      error => {
        this.msg = "Login e/ou senha invalidos!";
      }
    );
  }

  ngOnInit() {
    if (localStorage.getItem('token') != null && localStorage.getItem('token').trim() !== null) {

      this.router.navigate(['areaRestrita']);
    }
  }

}
