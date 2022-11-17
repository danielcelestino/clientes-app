import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';

import { Cliente } from '../cliente';
import { ClientesService } from '../../clientes.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  success: boolean = false;
  erros?: string[];
  id: number;

  constructor(
    private service: ClientesService, 
    private router: Router,
    private activatedRoute: ActivatedRoute) { 
    this.cliente = new Cliente();
    this.id = 0;
  }

  ngOnInit(): void {
    let params : Observable<Params> = this.activatedRoute.params;
    params.subscribe( urlParams => {
      this.id = urlParams['id'];
     
      this.service.getClienteById(this.id).subscribe({
        next: (data) => { 
          this.cliente = data;    
        },
        error: (error) => {          
          this.erros = error.error.listErrors;        
        }
        
      });
      
    })
  }

  onSubmit(){
    if(this.id){
      console.log('atualizando');
      this.service.atualizar(this.cliente).subscribe({
        next: (data) => {        
          this.success=true;
          this.erros = []; 
          console.log(data);    
        },
        error: (error) => {
            this.success=false;
            this.erros = error.error.listErrors;   
            console.log(error);     
        }
      }); 
    }else{
      console.log('salvando');
      this.service.salvar(this.cliente).subscribe({
        next: (data) => {        
          this.success=true;
          this.erros = [];
          this.cliente = data;     
        },
        error: (error) => {
            this.success=false;
            this.erros = error.error.listErrors;        
        }
      }); 
    }


    
       
          //this.service
   //   .salvar(this.cliente)
    //  .subscribe(response => {
    //      console.log(response);
    //      this.success=true;
     //     this.erros = [];
    //      console.log(response);
    //    }, errorResponse => {
    //      this.success=false;
    //        this.erros = errorResponse.error.listErrors;            
    //    }
    //  );






       // this.userService.addUser(this.user).subscribe(
    //  (data)=>{
        //success
    //    console.log(data);
    //    this._snack.open('Registered Successfully', 'OK', {
   //       duration: 2000,
   //       verticalPosition: 'top',
    //      horizontalPosition: 'center',
    //      panelClass: ['green-snackbar', 'login-snackbar'],
   //     });
   ///   },
   //   (error)=>{
    //    //error
   //     console.log(error);
   //     this._snack.open('Something went Wrong', 'OK', {
   //       duration: 2000,
   //       verticalPosition: 'top',
   //       horizontalPosition: 'center',
   //       panelClass: ['red-snackbar','login-snackbar'],
   //     });
   //   }
  //  );    
  }

  voltarParaListagem(){
    this.router.navigate(['/clientes/lista']); 
  }

  

}
