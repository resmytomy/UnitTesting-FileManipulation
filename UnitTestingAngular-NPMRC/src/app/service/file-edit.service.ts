import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileEditService {

  c 
  baseUrlString: string;
  constructor(private http: HttpClient) {
  }

 getfileContent(): Observable<string> {
    console.log('this....');
    
    return this.http.get<string>('http://localhost:8080/')
  }
// public  updateFileContents(data): Observable<any> {

//     return this.http.post<any>('http://localhost:8080/edit/ ',{'data':data});

//   }
  public updateFileContents(data: any): Observable<any> {
    return this.http.post('http://localhost:8080/edit', {'data':data});
  } 
}






