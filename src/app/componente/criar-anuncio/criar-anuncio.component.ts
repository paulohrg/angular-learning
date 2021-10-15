import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/model/anuncio';
import { AnuncioService } from 'src/app/service/anuncio.service';
import { ViaCepService } from 'src/app/service/via-cep.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-anuncio',
  templateUrl: './criar-anuncio.component.html',
  styleUrls: ['./criar-anuncio.component.css']
})
export class CriarAnuncioComponent implements OnInit {

  anuncio = new Anuncio();

  constructor(
    private anuncioService: AnuncioService,
    private viaCep: ViaCepService,
    private router: Router
  ) { }

  ngOnInit() {
    if (localStorage.getItem('token') == null || localStorage.getItem('token').trim() == null) {
      var path = window.location.pathname;
      if (path !== "/home" && path !== "/login" && path !== "/cadastrarUsuario") {
        this.router.navigate(['login']);
      }
    }
  }

  cadastrarAnuncio() {
    this.anuncioService.cadastrarAnuncio(this.anuncio).subscribe(data => {
      alert("Anuncio cadastrado com sucesso!")
    });
  }

  buscaCep(form) {
    this.viaCep.buscaEndereco(this.anuncio.cep).subscribe(data => {

      this.populaForm(data, form);
    });
  }

  populaForm(data, form) {
    form.setValue({
      titulo: this.anuncio.titulo == null ? '' : this.anuncio.titulo,
      descricao: this.anuncio.descricao == null ? '' : this.anuncio.descricao,
      preco: this.anuncio.preco == null ? '' : this.anuncio.preco,
      cep: data.cep,
      rua: data.logradouro,
      localidade: data.localidade,
      uf: data.uf
    });
  }

  onBlur() {
    this.anuncio.preco = this.anuncio.preco / 100;
    alert(this.anuncio.preco);
  }
}
