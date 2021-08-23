import { Component, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { LoingserviceService } from 'src/app/services/loingservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  Email : string = "";
  password : string = "";
  emailcheck :boolean =false;
  passwordcheck:boolean=false;

  static LoginAuth: boolean;

  userauth:boolean=false;
  passauth:boolean=false;
  static username: string ="";


  constructor(private http:HttpClient, private logserve:LoingserviceService,private router:Router) { }

  ngOnInit(): void {
    // LoginComponent.LoginAuth = false;
  }

  clear(){
    this.Email="";
    this.password="";
  }


  onLogin(){
    if(!this.Email)
    {
        this.passwordcheck = false;
        this.emailcheck= true;
        return;
    } 
    else if(!this.password)
    {
        this.emailcheck= false;
        this.passwordcheck = true;
        return;
    }
    const auth = {
      Email : this.Email,
      password : this.password
    }
    
    this.onlogin(auth);
    
    return ;
  }


  onlogin(user:any){
    this.logserve.onLogIn(user).subscribe((res)=>{
      if(res==='Failure')
      {
          this.passauth = true;
      }
      else if(res==="USER NOT FOUND")
      {
        this.userauth = true;
      }
      else
      {
        localStorage.setItem('Email',user.Email);
        localStorage.setItem('loggedIn','true');
        localStorage.setItem('Name',res);
        LoginComponent.username = res;
        LoginComponent.LoginAuth = true;
        this.router.navigate(['/dashboard']);
      }
    });
  }

}
