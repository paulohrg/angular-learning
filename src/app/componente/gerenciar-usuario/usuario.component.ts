import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class GerenciarUsuarioComponent implements OnInit {

  usuarios: Array<Usuario[]>;
  nomeBusca = '';
  total: Number;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {

    this.usuarioService.buscaUsuarios().subscribe(data => {
      this.usuarios = data.content;
      this.total = data.totalElements;
    });
  }

  deletarUsuario(id: Number, index) {
    this.usuarioService.deletarUsuario(id).subscribe(data => {
      alert(data);

      if (data === 'Usuário excluido com sucesso!') {
        this.usuarios.splice(index, 1);
      }
    });
  }

  buscaUsuariosPorNome() {
    if (this.nomeBusca === '' || this.nomeBusca.trim() === '') {
      this.ngOnInit();
    } else {
      this.usuarioService.buscaUsuariosPorNome(this.nomeBusca).subscribe(data => {
        this.usuarios = data.content;
        this.total = data.totalElements;
      })
    }
  }

  carregarUsuarioPorPagina(pagina) {

    if (this.nomeBusca === '') {
      this.usuarioService.buscaUsuarioPorPagina(pagina - 1).subscribe(data => {
        this.usuarios = data.content;
        this.total = data.totalElements;
      });
    } else {
      this.usuarioService.buscaUsuarioFiltroPorPagina(this.nomeBusca, (pagina - 1)).subscribe(data => {
        this.usuarios = data.content;
        this.total = data.totalElements;
      });
    }
  }
}

