import { Injectable , Output, EventEmitter} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from '../../models/User';
import { Observable } from 'rxjs';



// const httpOptions = {
//   headers: new HttpHeaders({
//     responseType : 'text',
//   })
// };


@Injectable({
  providedIn: 'root'
})
export class LoingserviceService {

  private dburl = 'http://localhost:3000/auth/';
  
  
  constructor(private http:HttpClient) {
  }


   onSignup(user:any) : Observable<any>{
    return this.http.post<User>(`${this.dburl}signup`,user);
  }

  onLogIn(user:any) :Observable<any>{
    return this.http.post(`${this.dburl}login`,user, { responseType:'text' });
  }
  
}
