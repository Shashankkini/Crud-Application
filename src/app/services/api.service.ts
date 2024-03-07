import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url='http://localhost:8080/api/products';

  constructor(private http:HttpClient) { }

  postProduct(data:any){
    return this.http.post<any>(this.url,data)
  }
  getProduct(){
    return this.http.get<any>(this.url)
  }

  putData(data:any,id:number){
    return this.http.post<any>(`${this.url}/`+id,data)

  }

  deleteData(id:number){
    console.log(id)
    return this.http.get<String>(`${this.url}/`+id);
  }
}
