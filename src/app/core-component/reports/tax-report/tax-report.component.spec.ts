import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxReportComponent } from './tax-report.component';

describe('TaxReportComponent', () => {
  let component: TaxReportComponent;
  let fixture: ComponentFixture<TaxReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaxReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
