import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Resourcedetails } from './resourcedetails';
import { map } from 'rxjs/operators';
import { Resourcemaster } from './resourcemaster';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  deactivate: string = "N";

  constructor(private httpService: HttpClient) { }

  //Observable ResourceDetails
  public getAllResources(): Observable<Resourcedetails[]> {
    return this.httpService.get<Resourcedetails[]>(environment.apiUrl + '/resourcedetails')
      .pipe();
  }

  //Observables; ResourceDetails
  public getResourceList(): Observable<any> {
    return this.httpService.get(environment.apiUrl + '/resourcedetails').pipe();
  }

  //Observables; ResourceDetails
  public getResourceListByName(searchName: String): Observable<any> {
    return this.httpService.get(environment.apiUrl + '/resourcedetails-by-name/' + searchName);
  }

  //ResourceDetails array
  public getResources() {
    return this.httpService.get<Resourcedetails[]>(environment.apiUrl + '/resourcedetails');
  }

  //ResourceMaster array
  public getResourceMaster(): Observable<any> {
    //return this.httpService.get<Resourcemaster[]>(environment.apiUrl + '/resource').pipe();
    return this.httpService.get(environment.apiUrl + '/resource');
  }

  //Create ResourceDetails
  public createResourceDetails(resourceDetails: Object): Observable<any> {
    return this.httpService.post(environment.apiUrl + '/resourcedetails', resourceDetails);
  }

  //search by id
  searchById(resourceId: number): Observable<any> {
    return this.httpService.get(environment.apiUrl + "/resourcedetails/" + resourceId);
  }

  //Update
  updateResource(resource: Object): Observable<any>{
    return this.httpService.put(environment.apiUrl + "/resourcedetails", resource);
  }

  //Active Resource
  getActiveResources() : Observable<any>{
    return this.httpService.get(environment.apiUrl + "/resourcedetails-isactive");
    
  }

  //Promise
  /*
  async getAll() {
   const response = await this.httpService.get(environment.apiUrl+'/resourcedetails').toPromise();
  }
  */
}
