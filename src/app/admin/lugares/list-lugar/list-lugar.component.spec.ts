import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLugarComponent } from './list-lugar.component';

describe('ListLugarComponent', () => {
  let component: ListLugarComponent;
  let fixture: ComponentFixture<ListLugarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLugarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
