import { Component, OnInit } from '@angular/core';

import { Cliente } from '../cliente';
import { ClientesService } from '../../clientes.service';

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
    this.service
      .salvar(this.cliente)
      .subscribe(response => {
          console.log(response);
          this.success=true;
        }, errorResponse => {
            this.erros = errorResponse.error.listErrors;
            console.log(errorResponse.error.listErrors);
        }
      );
  }

}
