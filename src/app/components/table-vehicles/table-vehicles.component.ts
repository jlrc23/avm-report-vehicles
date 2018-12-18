import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TableVehiclesDataSource } from './table-vehicles-datasource';
import {SettingsColumnsService} from '../../services/settings-columns.service';
import {FilterFormService} from '../../services/filter-form.service';
import {VehicleReportService} from '../../services/vehicle-report.service';
import {VehicleReportDataService} from '../../services/vehicle-report-data.service';
import {WizardDataService} from '../../services/wizard-data.service';

@Component({
  selector: 'app-table-vehicles',
  templateUrl: './table-vehicles.component.html',
  styleUrls: ['./table-vehicles.component.css'],
  providers: [VehicleReportService]
})
export class TableVehiclesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public dataSource: TableVehiclesDataSource;
  public allData:any;

  ngOnInit() {
    this.settingsColumnsService.displayedColumns = this.wizardDataService.fieldsSelecteds.map(item => item.value.name);
    this.dataSource = new TableVehiclesDataSource(this.paginator, this.sort, this.vehicleReportDataService);
    console.log(`Request: `, this.wizardDataService.getData());
    this.vehicleReportService.postReport(this.wizardDataService.getData()).subscribe((resp: any) => {
      console.log(`Recived typeResponse: ${typeof resp} Response:`, resp);
      this.allData = resp;
      this.vehicleReportDataService.setVehicles(this.allData);
    });
  }

  constructor(
    public vehicleReportService: VehicleReportService,
    public wizardDataService: WizardDataService,
    public settingsColumnsService: SettingsColumnsService,
    public vehicleReportDataService: VehicleReportDataService
    ) { }
}
