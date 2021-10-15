import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { HttpInterceptorModule } from './service/header-interceptor.service';
import { GerenciarUsuarioComponent } from './componente/gerenciar-usuario/usuario.component';
import { CadastrarUsuarioComponent } from './componente/cadastrar-usuario/cadastrar-usuario.component';
import { GuardaGuard } from './service/guarda.guard';
import { NgxMaskModule, IConfig} from 'ngx-mask';
import { CriarAnuncioComponent } from './componente/criar-anuncio/criar-anuncio.component';
import { MeusAnunciosComponent } from './componente/meus-anuncios/meus-anuncios.component';
import { NgxPaginationModule} from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './componente/home/home.component';
import { LoginComponent } from './componente/login/login.component';
import { AreaRestritaComponent } from './componente/area-restrita/area-restrita.component';

export const appRouters: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'areaRestrita', component: AreaRestritaComponent, canActivate: [GuardaGuard]},
  { path: 'usuarioList', component: GerenciarUsuarioComponent, canActivate: [GuardaGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'cadastrarUsuario', component: CadastrarUsuarioComponent},
  { path: 'criarAnuncio', component: CriarAnuncioComponent},
  { path: 'meusAnuncios', component: MeusAnunciosComponent}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRouters);
export const optionMask: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AreaRestritaComponent,
    GerenciarUsuarioComponent,
    CadastrarUsuarioComponent,
    CriarAnuncioComponent,
    MeusAnunciosComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routes,
    HttpInterceptorModule,
    NgxMaskModule.forRoot(optionMask),
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
