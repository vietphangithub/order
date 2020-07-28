import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcountDetailComponent } from './acount-detail.component';

describe('AcountDetailComponent', () => {
  let component: AcountDetailComponent;
  let fixture: ComponentFixture<AcountDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcountDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcountDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
