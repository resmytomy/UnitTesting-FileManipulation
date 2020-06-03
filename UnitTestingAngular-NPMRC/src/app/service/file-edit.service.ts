import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileEditService {

  c 
  constructor(private http: HttpClient) {
  }

 getfileContent(): Observable<string> {
    console.log('this....');
    
    return this.http.get<string>('http://localhost:8080/')
  }
  updateFileContents(data): Observable<string> {

    return this.http.post<string>('http://localhost:8080/edit/ ',{'data':data});

  }
}
