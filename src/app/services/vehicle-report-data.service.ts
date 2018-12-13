import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleReportDataService {
  dataBehaviorSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor() { }

  setVehicles( vehicleDataInterface: any)  {
    console.log('load data', vehicleDataInterface);
    this.dataBehaviorSubject.next(vehicleDataInterface);
  }
}
