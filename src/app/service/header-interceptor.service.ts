import { Injectable, NgModule } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'
import { Router } from '@angular/router';

@Injectable()
export class HeaderInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const tokenPuro = localStorage.getItem('token')

    if (tokenPuro != null && req.url.includes('localhost:8080')) {

      const tokenCompleto = 'Bearer ' + tokenPuro;

      const tokenRequest = req.clone({
        headers: req.headers.set('Authorization', tokenCompleto)
      });

      return next.handle(tokenRequest).pipe(

        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse && (event.status === 200 || event.status === 201)) {
          }
          if (event instanceof HttpErrorResponse) {

            alert('erro:' + event.status);
          }
        },
          (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 403) {
                localStorage.clear();
                this.router.navigate(['login']);
              }
            }
          }),
        catchError(this.processaErros)
      );
    } else {
      return next.handle(req).pipe(

        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse && (event.status === 200 || event.status === 201)) {
          }
        }),
        catchError(this.processaErros)
      );
    }
  }

  processaErros(erro: HttpErrorResponse) {

    let mensagemDeErro = 'Erro desconhecido.';

    if (erro.error instanceof ErrorEvent) {

      mensagemDeErro = 'Erro: ' + erro.error.error;
    } else {
      mensagemDeErro = 'Código: ' + erro.error.status + '\n Mensagem: ' + erro.error.error;
    }
    return throwError(mensagemDeErro);
  }
}


@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptorService,
      multi: true,
    },
  ],
})

export class HttpInterceptorModule {
}