import { Component, OnInit } from '@angular/core';
import { TitleStrategy, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../interfaces/user';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(private toastr: ToastrService,
              private userService: UserService,
              private router: Router,
              private errorService: ErrorService){
  }

  ngOnInit(): void {      
  }

  login(){
    //Validamos que el usuario está insertando datos
    if (this.username == '' || this.password == ''){
        this.toastr.error('¡Todos los campos son obligatorios!', "AVISO ERROR");
        return 
    }

    //Creamos el body
    const user: User  = {
      username: this.username,
      password: this.password
    }

    this.loading = true;
    this.userService.login(user).subscribe({
      next:(token) => {
        localStorage.setItem('token', token);
        this.router.navigate(['/dashboard']);
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;        
        this.errorService.msgError(e);
      }
    })
  }

}
