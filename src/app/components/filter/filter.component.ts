import { Component, OnInit } from '@angular/core';
import {VehicleReportService} from '../../services/vehicle-report.service';
import {FormControl, FormGroup} from '@angular/forms';
import {CatalogItemInterface} from '../../interfaces/catalog-item.interface';
import {WizardDataService} from '../../services/wizard-data.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  public typesService: CatalogItemInterface[] = [];
  public typesDocumentsCatalog: CatalogItemInterface[] = [];
  public typesReviews: CatalogItemInterface[] = [];
  public secureCatalog: CatalogItemInterface[] = [];
  public frmFilter: FormGroup;

  constructor(
    public vehicleReportService: VehicleReportService,
    public wizardDataService: WizardDataService
  ) {
    this.frmFilter = new FormGroup({
      typesService: new FormControl(),
      typesDocument: new FormControl(),
      typeReview: new FormControl(),
      typesSeguro: new FormControl()
    });
  }

  ngOnInit() {
    this.vehicleReportService.getTypeServices().subscribe(resp => {
        for (const i in resp) {
          if (resp.hasOwnProperty(i)) {
            const id: number = Number(i);
            this.typesService.push({id, description: resp[i].service});
          }
        }
    });
    this.vehicleReportService.getTipoDocumento().subscribe(resp => {
      for (const i in resp) {
        if (resp.hasOwnProperty(i)) {
          const id: number = Number(i);
          this.typesDocumentsCatalog.push({id, description: resp[i]});
        }
      }
    });
    this.vehicleReportService.getTypeReviews().subscribe(resp => {
      this.typesReviews = resp;
    });
    this.vehicleReportService.getSeguroFilter().subscribe(resp => {
        this.secureCatalog = resp;
    });



    this.frmFilter.valueChanges.subscribe(value => {
      console.log(`[RegistrationComponent/ngOnInit/registrationForm::valuesChanges] Value: `, value);
      this.wizardDataService.setFilters(value);
    });
  }


}
