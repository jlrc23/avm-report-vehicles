import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WizardDataService} from '../../services/wizard-data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-wizar-report',
  templateUrl: './wizar-report.component.html',
  styleUrls: ['./wizar-report.component.css']
})
export class WizarReportComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    public wizardDataService: WizardDataService,
    private _formBuilder: FormBuilder,
    public router: Router
  ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  makeReporte() {
    this.router.navigate(['report']);
  }
}
