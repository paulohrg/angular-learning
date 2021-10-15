import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.css']
})
export class CadastrarUsuarioComponent implements OnInit {

  usuario = new Usuario();

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  cadastrarUsuario() {

    this.usuarioService.cadastrarUsuario(this.usuario).subscribe(data => {
      if (data === 'Login Já cadastrado!') {
        alert(data);
      } else {
        alert('Usuario Cadastrado com Sucesso');
      }
    });
  }

}
