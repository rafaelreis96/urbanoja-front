import { CategoriasService } from './../categorias.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-autocomplete-categorias',
  templateUrl: './autocomplete-categorias.component.html',
  styleUrls: ['./autocomplete-categorias.component.scss']
})
export class AutocompleteCategoriasComponent implements OnInit {
  textControl = new FormControl();
  categoria: any;
  categorias: any[] = [];
  text = "";

  @Input() label = "Categoria";
  @Input() placeholder = "";
  @Input() required = false;
  @Output() selected = new EventEmitter();

  constructor(private categoriasService: CategoriasService) { }

  ngOnInit(): void {

    this.textControl.valueChanges.subscribe((val: string) => {
      this.categoriasService.filterByNome(this.textControl.value)
      .subscribe((categorias: any) => {
        this.categorias = categorias;
      });
    });

  }


  setCategoria(event: any) {
    if(event) {
      this.selected.emit(this.categoria = event);
    }
  }

  displayFn(categoria: any): string {
    return categoria ? categoria.nome : '';
  }
}
