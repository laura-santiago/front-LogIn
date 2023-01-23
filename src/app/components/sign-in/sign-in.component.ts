import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../interfaces/user';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  username: string ='';
  password: string ='';
  confirmPassword: string ='';
  loading:boolean = false;


  constructor(private toastr: ToastrService,
              private userService: UserService,
              private router: Router,
              private errorService: ErrorService) { }

  ngOnInit(): void {      
  }

  addUser(){
    // 1.- Validar que el usuario ingrese valores
    if (this.username == '' || this.password == '' || this.confirmPassword == ''){
      this.toastr.error('¡Todos los campos son obligatorios!', "AVISO ERROR");
      return;
    } 

    // Validamos que las passwords sean iguales
    if (this.password != this.confirmPassword){
      this.toastr.error('¡Las passwords NO son iguales !', "AVISO PASSWORD");
      return;
    }

    //Creamos el objeto
    const user: User ={
      username: this.username,
      password: this.password
    }
    this.loading = true;
    this.userService.signIn(user).subscribe({
      next: (v) => {
        this.loading = false;
        this.toastr.success(`Usuario ${this.username} fue registrado con éxito!` , "REGISTRADO");
        this.router.navigate(['/login']);  
      },
      error: (e: HttpErrorResponse) => {
        this.loading=false;
        this.errorService.msgError(e);
      },
      complete: () => console.info('Observable finalizó!!  << mensaje opcional >>')       
    })
  }

}
