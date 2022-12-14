import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../clientes/cliente';
import { ClientesService } from '../../clientes.service';
import { ServicoPrestado } from '../servicoPrestado';
import { ServicoPrestadoService } from '../../servico-prestado.service'

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes: Cliente[] = [];
  servico : ServicoPrestado;
  success: boolean = false;
  erros?: string[];

  constructor(
    private clienteService: ClientesService,
    private servicoPrestadoService: ServicoPrestadoService
  ) { 
    this.servico = new ServicoPrestado();
  }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe( response => this.clientes = response);
  }

  onSubmit(){
    console.log(this.servico);
    this.servicoPrestadoService.salvar(this.servico).subscribe({
      next: (data) => {        
        this.success=true;
        this.erros = [];
        this.servico = new ServicoPrestado();  //Para limpar o formulario   
      },
      error: (error) => {
          this.success=false;
          this.erros = error.error.listErrors;        
      }
    }); 

  }

}
