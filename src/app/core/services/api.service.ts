import { Injectable } from '@angular/core';
import { HttpserviceService} from '../services/httpservice.service';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

 
  constructor(
    private http:HttpserviceService
  ) { }
  postapi(apiname: string,payload?:any|null,header?:any|null){
    return this.http.post(apiname,payload,header);
  }
  getapi(apiname: string,header?:any|null,params?:any|null){
    return this.http.get(apiname,header,params);
  }
}
