import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
// import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from '../login/login.component';
import { CalfetchService } from 'src/app/services/calfetch.service';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {

  private addcal !: Subscription;

  @Input() onaddcal !: Observable<number>;
  
  usrname !: string
  emailid !: string
  
  widthh : string = "";
  calorie: number = 0;

  constructor(private http:HttpClient,private fetcher:CalfetchService) {
    this.usrname = localStorage.getItem('Name') || "";
    this.emailid = localStorage.getItem('Email') || "";
   }


  ngOnInit(){
    this.getcal(this.emailid);
    this.addcal = this.onaddcal.subscribe((data)=>{
      this.calorie+=data;
      this.postcal(this.calorie);
      this.setcal(this.calorie);
    });
  }


  // To fetch the calorie from data base
 getcal(name:string) {
      this.fetcher.onFetchcal(name).subscribe((res)=> {
          const cal =  Number(res.calories);
          this.calorie = cal;
          this.setcal(cal);
      });
  }

// to set the value and width of the bar
setcal(cal:number){
  const percent = (cal / 2000) * 100;
  if(percent<=100)
  this.widthh = percent.toString()+"%";
  else
  this.widthh = "100%";
}

postcal(cal:number){
  this.fetcher.onpostcal(this.calorie,this.emailid).subscribe();
}


}
