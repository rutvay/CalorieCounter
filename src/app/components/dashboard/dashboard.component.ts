import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, Subscriber } from 'rxjs';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  onaddcaltochild: Subject<number> = new Subject<number>();

  flag : string = localStorage.getItem('loggedIn') || 'false';
  Item : string  = "";
  calories : number = 0;


  constructor(private router:Router,private http : HttpClient) {
    if(this.flag === 'false')
    {
        alert("Login First");
        router.navigate(['']);
    }
  }

  ngOnInit(): void {

  }

  onAddfood(){
    if(this.Item==="")
    {
      console.log('Empty');
      return;
    }

    const item = this.Item;
    this.fetchfood(item);

    return; 
      
  }

  // this is to get calroie from the array recived
  fetchfood(item:string){
    this.getFood(item).subscribe((res)=>{
      // console.log(res.parsed[0].food.nutrients.ENERC_KCAL);
      this.calories = res.parsed[0].food.nutrients.ENERC_KCAL;
      this.onaddcaltochild.next(this.calories);
    });
  }
  
  // requesting data fron the API
  getFood(item:string) : Observable<any>{
      const apiurl = `https://api.edamam.com/api/food-database/v2/parser?app_id=60fe2dd8&app_key=73d53f71cfbd7441ec7e08c2aa804119&ingr=${item}&nutrition-type=cooking`;
      return this.http.get(apiurl);
  }



  onLogout(){
    localStorage.clear();
  }
}
