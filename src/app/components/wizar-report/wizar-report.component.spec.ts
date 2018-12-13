import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizarReportComponent } from './wizar-report.component';

describe('WizarReportComponent', () => {
  let component: WizarReportComponent;
  let fixture: ComponentFixture<WizarReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizarReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizarReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
