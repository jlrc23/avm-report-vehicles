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
  msgStatus: string;
  public dataSource: TableVehiclesDataSource;
  public allData: any;

  ngOnInit() {
    this.settingsColumnsService.displayedColumns = this.wizardDataService.fieldsSelecteds.map(item => item.value.name);
    this.dataSource = new TableVehiclesDataSource(this.paginator, this.sort, this.vehicleReportDataService);
    console.log(`Request: `, this.wizardDataService.getData());
    this.msgStatus = 'Cargando...';
    this.vehicleReportService.postReport(this.wizardDataService.getData()).subscribe((resp: any) => {
      console.log(`Recived typeResponse: ${typeof resp} Response:`, resp);
      this.allData = resp;
      this.msgStatus = (Array.isArray(this.allData) && this.allData.length > 0 ) ?  '' : 'No hay datos';
      this.vehicleReportDataService.setVehicles(this.allData);
    }, error1 => {
      console.error(error1);
      this.msgStatus = 'Ocurrio un error';
    });
  }

  constructor(
    public vehicleReportService: VehicleReportService,
    public wizardDataService: WizardDataService,
    public settingsColumnsService: SettingsColumnsService,
    public vehicleReportDataService: VehicleReportDataService
    ) { }
}
