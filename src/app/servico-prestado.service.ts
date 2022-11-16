import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ServicoPrestado } from './servico-prestado/servicoPrestado';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {

  apiURL : string = environment.apiURLBase + '/api/servicos-prestados';

  constructor( private http: HttpClient) { }

  salvar(servicoPrestado : ServicoPrestado ) : Observable<ServicoPrestado> {
    return this.http.post<ServicoPrestado>(`${this.apiURL}`, servicoPrestado);
  }

  atualizar(servicoPrestado : ServicoPrestado) : Observable<any> {
    return this.http.put<ServicoPrestado>(`${this.apiURL}/${servicoPrestado.id}`, servicoPrestado);
  }

  //getServicosPrestados() : Observable<ServicoPrestado[]>{
  //  return this.http.get<ServicoPrestado[]>(`${this.apiURL}`);    
  //}

  //pesquisar(servicoPrestado : ServicoPrestado ) : Observable<ServicoPrestado[]> {
    //return this.http.post<ServicoPrestado[]>(`${this.apiURL}`, servicoPrestado);
 // }

  deleteServicoPrestado(id : number) : Observable<any>{
    return this.http.delete<any>(`${this.apiURL}/${id}`);    
  }

  buscar(nome : String, mes: number) : Observable<ServicoPrestado[]> {
    console.log('buscar do service');
    console.log(nome);
    console.log(mes);
    
    const httpParams = new HttpParams().set("nome", nome ? nome.toString() : "").set("mes", mes? mes.toString(): "");    
    const url = this.apiURL + '?' + httpParams.toString();
    console.log(url);
    return this.http.get<any>(`${url}`);

  }

}
