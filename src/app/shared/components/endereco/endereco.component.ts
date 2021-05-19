import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SearchGmapComponent, PlaceMap } from './../search-gmap/search-gmap.component';
import { Endereco } from './../../models/endereco.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss']
})
export class EnderecoComponent implements OnInit {
  formEndereco: FormGroup;
  @Input() parentForm: FormGroup;
  @Input() endereco: Endereco;
  @Output() changed:EventEmitter<Endereco> = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.formEndereco = this.createForm();

    this.formEndereco.valueChanges.subscribe( (value) => {
       this.changed.emit(value);
    });

    if(this.parentForm) {
      this.parentForm.addControl('endereco', this.formEndereco);
    }
  }

  createForm() {
    return new FormGroup({
      rua: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      bairro: new FormControl('', Validators.required),
      cep: new FormControl(''),
      complemento: new FormControl(''),
      cidade_id: new FormControl('', Validators.required),
      lat: new FormControl(''),
      lng: new FormControl('')
    });
  }

  setValuesformEndereco(endereco: Endereco) {
    this.formEndereco.patchValue({
      rua: endereco.rua,
      numero: endereco.numero,
      bairro: endereco.bairro,
      cep: endereco?.cep,
      complemento: endereco.complemento,
      cidade_id: endereco?.cidade?.id,
      lat: endereco.lat,
      lng: endereco.lng,
    });
  }

  abrirDialogMaps() {
    const dialogRef = this.dialog.open(SearchGmapComponent, {
      panelClass: 'dialog-md',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((place: PlaceMap) => {
      console.log(place)
      if(place) {
        this.formEndereco.patchValue({
          rua: place.rua,
          numero: place.numero,
          bairro: place.bairro,
          lat: place.lat,
          lng: place.lng
        });
      }
    });
  }

}
