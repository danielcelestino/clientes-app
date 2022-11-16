import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(
    private router:Router
  ) { }

  onSubmit(){
    console.log(this.username + " - " +this.password);
    this.router.navigate(['/home']);
  }

  preparaCadatrar(event:any){
    event.preventDefault();
    this.cadastrando = true;
  }


  cancelaCadatro(){
    this.cadastrando = false;
  }


}
