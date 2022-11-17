import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { ServicoPrestado } from '../servicoPrestado';

@Component({
  selector: 'app-servico-prestado-lista',
  templateUrl: './servico-prestado-lista.component.html',
  styleUrls: ['./servico-prestado-lista.component.css']
})
export class ServicoPrestadoListaComponent implements OnInit {

  nome: string;
  mes: number;
  meses: number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  servicosPrestados: ServicoPrestado[] = [];
  servicoPrestadoSelecionado :ServicoPrestado;
  msgSucesso: string;
  msgErro: string;

  constructor(private service: ServicoPrestadoService, private router: Router) {

   }

  ngOnInit(): void {
    this.consultar();
    
  }

  novoCadastro(){
    this.router.navigate(['/servico-prestado/form'])
  }

  preparaDelecao(servicoPrestado : ServicoPrestado){
    this.servicoPrestadoSelecionado = servicoPrestado;    
  }

  deletarServicoPrestado(){
    this.service.deleteServicoPrestado(this.servicoPrestadoSelecionado.id)
      .subscribe({
        complete: () => {
          this.msgSucesso = 'Serviço deletado com sucesso!';
          this.ngOnInit();
        },    
        error: () => {this.msgErro = 'Erro ao excluir serviço!'}       
      });      
  }

  consultar(){
    console.log(this.nome, this.mes);
    this.service.buscar(this.nome,this.mes).subscribe( response => {
      this.servicosPrestados = response;
      if(this.servicosPrestados.length <= 0){
        this.msgErro = "Nenhum registro encontrado!";
      }
    });
    
  }

}
