import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAcountComponent } from './list-acount.component';

describe('ListAcountComponent', () => {
  let component: ListAcountComponent;
  let fixture: ComponentFixture<ListAcountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAcountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
