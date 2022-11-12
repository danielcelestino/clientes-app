import { Component, OnInit } from '@angular/core';

import { Cliente } from '../cliente';
import { ClientesService } from '../../clientes.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  success: boolean = false;
  erros?: string[];

  constructor(private service: ClientesService) { 
    this.cliente = service.getCliente();
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.service.salvar(this.cliente).subscribe({
      next: (data) => {
        console.log(data);
        this.success=true;
        this.erros = [];
        this.cliente = data;
        console.log(data);        
      },
      error: (error) => {
          this.success=false;
          this.erros = error.error.listErrors;  
           console.log(error);        
      }
    }); 
       
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

}
