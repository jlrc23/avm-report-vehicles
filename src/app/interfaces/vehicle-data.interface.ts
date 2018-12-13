import {ActionsEnum} from '../enums/actions.enum';
import {VehicleInterface} from './vehicle.interface';

export interface VehicleDataInterface {
  action: ActionsEnum;
  data: VehicleInterface[];
}
