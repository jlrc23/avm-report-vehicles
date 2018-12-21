import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableVehiclesComponent } from './components/table-vehicles/table-vehicles.component';
import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatSidenavModule, MatInputModule, MatCheckboxModule, MatSelectModule, MatButtonModule, MatStepperModule, MatRadioModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { IconsComponent } from './icons/icons.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FilterComponent } from './components/filter/filter.component';
import { WizarReportComponent } from './components/wizar-report/wizar-report.component';
import {PromptSelectorModule} from '../../projects/prompt-selector/src/lib/prompt-selector.module';
import { FieldsSelectorComponent } from './components/fields-selector/fields-selector.component';
import {NgxWebstorageModule} from 'ngx-webstorage';

@NgModule({
  declarations: [
    AppComponent,
    TableVehiclesComponent,
    IconsComponent,
    FilterComponent,
    WizarReportComponent,
    FieldsSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule,
    MatStepperModule,
    PromptSelectorModule,
    MatRadioModule,
    // NgxWebstorageModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
