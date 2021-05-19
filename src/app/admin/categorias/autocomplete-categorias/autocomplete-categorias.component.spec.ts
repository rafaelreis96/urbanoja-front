import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteCategoriasComponent } from './autocomplete-categorias.component';

describe('AutocompleteCategoriasComponent', () => {
  let component: AutocompleteCategoriasComponent;
  let fixture: ComponentFixture<AutocompleteCategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteCategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
