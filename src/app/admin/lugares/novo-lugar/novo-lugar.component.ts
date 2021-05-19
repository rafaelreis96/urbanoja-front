import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-novo-lugar',
  templateUrl: './novo-lugar.component.html',
  styleUrls: ['./novo-lugar.component.scss']
})
export class NovoLugarComponent implements OnInit {
  formLugar: FormGroup;

  constructor() { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formLugar = new FormGroup({
      nome: new FormControl(),
      categoria: new FormControl(),
      sobre: new FormControl(),
      celular: new FormControl(),
      telefone: new FormControl(),
      whatsapp: new FormControl(),
      site: new FormControl(),
      fabebook: new FormControl(),
      instagram: new FormControl(),

    });
  }

}
