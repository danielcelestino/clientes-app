import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './login/usuario';

import { environment } from '../environments/environment';

import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = environment.apiURLBase + '/api/usuarios';
  tokenURL: string = environment.apiURLBase + environment.obterTokenUrl;
  clientId : string = environment.clienteId;
  clientSecret: string = environment.clienteSecret;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http:HttpClient) { }

  obterToken(){
    const tokenString = localStorage.getItem('access_token');
    if(tokenString){
      const token = JSON.parse(tokenString).access_token;
      return token;
    }
    return null;

  }

  isAutheticated():boolean{
    const token = this.obterToken();

    if(token){
      const expirated = this.jwtHelper.isTokenExpired(token);
      return !expirated;
    }
    return false;
  }

  salvar(usuario: Usuario) : Observable<any> {
    return this.http.post<any>(this.apiURL, usuario);
  }

  logar(username:string, password:string) : Observable<any>{
    const params = new HttpParams()
        .set('username', username)
        .set('password',password)
        .set('grant_type','password');
    
    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
      'Content-Type':'application/x-www-form-urlencoded'
    }
    return this.http.post(this.tokenURL,params.toString(), { headers});

  }
}
