import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcustomersComponent } from './editcustomers.component';

describe('EditcustomersComponent', () => {
  let component: EditcustomersComponent;
  let fixture: ComponentFixture<EditcustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
