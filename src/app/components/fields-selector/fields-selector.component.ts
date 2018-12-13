import { Component, OnInit } from '@angular/core';
import {VehicleReportService} from '../../services/vehicle-report.service';
import {SelectItemBean} from '../../../../projects/prompt-selector/src/lib/select-item-bean';
import {WizardDataService} from '../../services/wizard-data.service';

@Component({
  selector: 'app-fields-selector',
  templateUrl: './fields-selector.component.html',
  styleUrls: ['./fields-selector.component.css']
})
export class FieldsSelectorComponent implements OnInit {
  fields;
  fieldsLists:SelectItemBean[];
  loading:boolean;
  constructor(
    public wizardDataService: WizardDataService,
    public vehicleReportService:VehicleReportService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.vehicleReportService.getFields().subscribe(resp=>{
      this.loading = false;
      this.fields = resp;
      this.fieldsLists = this.fields.map((item)=>{
        const value ={name: item.fieldName, key:item.fieldKey };
        return <SelectItemBean>{id:item.id, text:item.description, value };
      });
      console.log(resp);
    })
  }

  onChangesFieldsSelected(values){
    console.log(`[FieldsSelectorComponent::onChangesFieldsSelected] values: `, values);
    this.wizardDataService.setFields(values);
  }

}
