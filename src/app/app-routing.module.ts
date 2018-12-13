import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WizarReportComponent} from './components/wizar-report/wizar-report.component';
import {TableVehiclesComponent} from './components/table-vehicles/table-vehicles.component';

const routes: Routes = [
  {
    component: WizarReportComponent,
    path: ''
  },
  {
    component: TableVehiclesComponent,
    path: 'report'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
