import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public get(route: string, params: any) {
    return this.httpClient.get(environment.apiBaseRoute + route, { params });
  }

  public post(route: string, body: any) {
    return this.httpClient.post(environment.apiBaseRoute + route, body);
  }

  public put(route: string, body: any) {
    return this.httpClient.put(environment.apiBaseRoute + route, body);
  }

  public patch(route: string, body: any) {
    return this.httpClient.patch(environment.apiBaseRoute + route, body);
  }

  public delete(route: string, body: any) {
    return this.httpClient.delete(environment.apiBaseRoute + route, body);
  }

}

export class ApiResponse{
  data: any;
  mensaje: string;
}