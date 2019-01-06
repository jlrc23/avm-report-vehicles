import { Injectable } from '@angular/core';
import {SelectItemBean} from '../../../projects/prompt-selector/src/lib/select-item-bean';
import {BehaviorSubject} from 'rxjs';
import {WizardDataInterface} from '../interfaces/wizard-data.interface';

@Injectable({
  providedIn: 'root'
})
export class WizardDataService {
  //@SessionStorage('fieldsSelecteds')
  public fieldsSelecteds: SelectItemBean[];
  //@SessionStorage('filters')
  public filters: any;

  public fieldsSubject: BehaviorSubject<SelectItemBean[]> = new BehaviorSubject<SelectItemBean[]>(this.fieldsSelecteds);

  getData(): WizardDataInterface {
    return <WizardDataInterface>{
      fieldsSelecteds: this.fieldsSelecteds,
      filters: this.filters
    };
  }

  setFields(fieldsSelecteds: SelectItemBean[]) {
    this.fieldsSelecteds = [...fieldsSelecteds];
    this.fieldsSubject.next(this.fieldsSelecteds);
  }


  setFilters(filters: any) {
    this.filters = filters;
  }

}
