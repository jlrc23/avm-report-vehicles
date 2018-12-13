import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {SidebarService} from './services/sidebar.service';
import {SettingsColumnsService} from './services/settings-columns.service';
import {FilterFormService} from './services/filter-form.service';
import {Convert2CSV} from './functions/convert2csv';
import {Router} from '@angular/router';
import {VehicleReportDataService} from './services/vehicle-report-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SettingsColumnsService, FilterFormService]
})
export class AppComponent implements OnInit {
  filters:string[]=[];
  @ViewChild(MatSidenav) mainSideNav: MatSidenav;
  public actionFilter: string;

  constructor(public sidebarService: SidebarService,
              public  settingsColumnsService: SettingsColumnsService,
              public vehicleReportDataService: VehicleReportDataService,
              public router: Router
              ) { }

  ngOnInit(): void {
    this.sidebarService.setSidebar(this.mainSideNav);
    this.actionFilter = this.settingsColumnsService.showFilter?   'Hide':'Show';
  }

  public toggleSidebar(){
    this.sidebarService.toggle();
  }

  toggleFilter(){
    this.actionFilter = (this.actionFilter == 'Hide')? 'Show': 'Hide';
    this.settingsColumnsService.showFilter  = !this.settingsColumnsService.showFilter;
  }

  download(){
    let csvData = Convert2CSV(this.vehicleReportDataService.dataBehaviorSubject.getValue());
    let a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url= window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'vehicles.csv';/* your file name*/
    a.click();
    return 'success';
  }

  back2Home(){
    this.router.navigate(["/"]);
  }
  
}
