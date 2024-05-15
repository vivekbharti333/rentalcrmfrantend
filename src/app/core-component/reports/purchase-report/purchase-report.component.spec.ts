import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseReportComponent } from './purchase-report.component';

describe('PurchaseReportComponent', () => {
  let component: PurchaseReportComponent;
  let fixture: ComponentFixture<PurchaseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
