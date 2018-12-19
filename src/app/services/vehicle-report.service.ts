import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {VehicleInterface} from '../interfaces/vehicle.interface';
import {FieldInterface} from '../interfaces/field.interface';

@Injectable({
  providedIn: 'root'
})
export class VehicleReportService {

  constructor(public  httpClient: HttpClient) {
  }


  getReport(): Observable<VehicleInterface[]> {
    const endPoint = environment.api + 'vehiculosreporte/getReportAjax';
    console.log(`Request to EndPoint:`, endPoint);
    return this.httpClient.get<VehicleInterface[]>(endPoint);
  }


  postReport(data: any): Observable<VehicleInterface[]> {
    const endPoint = environment.api + 'vehiculosreporte/getReportAjax';
    console.log(`Request to EndPoint:`, endPoint);
    return this.httpClient.post<VehicleInterface[]>(endPoint, data);
  }

  getTypeServices(): Observable<any> {
    const endPoint = environment.api + 'vehiculosreporte/getCatalog?type=typeServiceVehicle';
    console.log(`Request to EndPoint:`, endPoint);
    return this.httpClient.get<any>(endPoint);
  }

  getTipoDocumento(): Observable<any> {
    const endPoint = environment.api + 'vehiculosreporte/getCatalog?type=documentTypes';
    console.log(`Request to EndPoint:`, endPoint);
    return this.httpClient.get<any>(endPoint);
  }

  getSeguroFilter(): Observable<any> {
    const endPoint = environment.api + 'vehiculosreporte/getCatalog?type=typeSeguro';
    console.log(`Request to EndPoint:`, endPoint);
    return this.httpClient.get<any>(endPoint);
  }


  getFields(): Observable<FieldInterface[]> {
    const endPoint = environment.api + 'vehiculosreporte/getCatalog?type=fields';
    console.log(`Request endpoint: `, endPoint);
    return this.httpClient.get<any>(endPoint);
  }

}
