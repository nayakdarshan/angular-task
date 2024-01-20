import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { environment } from '../../../environment/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private uniqueIds = new Set<string>();
  private apiCallCount = new BehaviorSubject<number>(0);

  server = environment.server + environment.APIKey;
  public urls: any = {
    create:this.server+'/create',
  }
  constructor(private http: HttpClient) { }


    create(reqBody:any): any {
      return this.http.post(this.urls.create,reqBody);
    }
    view():Observable<any[]>{
      return this.http.get<any[]>(this.urls.create);
    }
    edit(id:any,reqbody:any):Observable<any[]>{
      return this.http.put<any[]>(this.urls.create +'/'+id, reqbody);
    }
    delete(id:any):Observable<any[]>{
      return this.http.delete<any[]>(this.urls.create +'/'+id);
    }

    getApiCallCount() {
      return this.apiCallCount.asObservable();
    }
  
    incrementApiCall(id:string) {
      if (!this.uniqueIds.has(id)) {
        this.uniqueIds.add(id);
        this.apiCallCount.next(this.apiCallCount.value + 1);
      }
    } 
}
