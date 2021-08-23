import { Injectable , Output, EventEmitter} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { } from '';

@Injectable({
  providedIn: 'root'
})
export class CalfetchService {

  private fetchurl = 'http://localhost:3000/calfetch/';
  constructor(private http : HttpClient) { }

  onFetchcal(name:string):Observable<any>{
    return this.http.get(this.fetchurl+name);
  }

  onpostcal(cal:number,name:string):Observable<any>{
    const data = { 
      calorie : cal
    };
    return this.http.put(`http://localhost:3000/cal/${name}`,data);
  }
}
