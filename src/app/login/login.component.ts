import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username:string;
  password: string;
  loginError: boolean;
  cadastrando: boolean;
  msgSucess : string;
  erros?: string[];

  constructor(
    private router:Router,
    private authService: AuthService 
  ) { }

  onSubmit(){
    console.log(this.username + " - " +this.password);
    this.authService.logar(this.username, this.password).subscribe({
      next: (data) =>{
        const access_token = JSON.stringify(data);
        localStorage.setItem('access_token',access_token);
        this.loginError=false;
        this.msgSucess = 'Cadastro realizado com sucesso! Efetue o login!';
        this.erros = [];
        console.log(data);
        this.router.navigate(['/home']);
      }, error: (error) => {
        this.loginError=true;
        this.msgSucess = null;
        this.erros = error.error.listErrors; 
      }
  });

    
  }

  preparaCadatrar(event:any){
    event.preventDefault();
    this.cadastrando = true;
  }


  cancelaCadatro(){
    this.cadastrando = false;
  }

  cadastrarUsuario(event:any){
    event.preventDefault();
    const usuario: Usuario = new Usuario;
    usuario.username = this.username;
    usuario.password = this.password;
    this.authService.salvar(usuario)
        .subscribe({
            next: (data) =>{
              this.loginError=false;
              this.msgSucess = 'Cadastro realizado com sucesso! Efetue o login!';
              this.erros = [];
              this.cadastrando=false;
              this.username='';
              this.password='';
            }, error: (error) => {
              this.loginError=true;
              this.msgSucess = null;
              this.erros = error.error.listErrors; 
            }
        });
  }


}
