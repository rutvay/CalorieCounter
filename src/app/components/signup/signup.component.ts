import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {User} from '../../../models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoingserviceService } from 'src/app/services/loingservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @Output() onSignup:EventEmitter<User> = new EventEmitter(); 

  fname : string ="";
  lname : string= "";
  Email: string = "";
  password: string ="";

  error : string = "";

  constructor(private router:Router,private http:HttpClient,private loinservice:LoingserviceService) { }

  ngOnInit(): void {
  }


  onclear(){
    this.Email = "";
  }

  private url = 'http://localhost:3000';

  onSubmitform()
  {
     const user = {
      fname : this.fname,
      lname : this.lname,
      email : this.Email,
      password : this.password
    };


    this.onSignsubmit(user);

    this.error = "";
    return;

  }



  onSignsubmit(user:User)
  {
    this.loinservice.onSignup(user).subscribe((res) => {
      console.log(res.message);
      if(res.message === 'User registered'){
        this.router.navigate(['']);
      }
    },
    (err) => {
      if(err.error.error.message[0] == "D")
      {
        this.error = "This Email Already exsist Please login";
      }
    }
    );
  }
}
