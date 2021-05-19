import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { ColumnItem } from './../../../shared/components/custom-mat-table/custom-mat-table.model';
import { NovoLugarComponent } from './../novo-lugar/novo-lugar.component';


@Component({
  templateUrl: './list-lugar.component.html',
  styleUrls: ['./list-lugar.component.scss']
})
export class ListLugarComponent implements OnInit {
  lugares: any[];
  pagination: any;
  cols: ColumnItem[];
  pagina  = 1;
  tamanho = 15;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.cols = [
      {name: 'logo',      label: 'Logo'},
      {name: 'nome',      label: 'Nome'},
      {name: 'categoria', label: 'Categoria'},
      {name: 'endereco',  label: 'Endereço'},
    ];


  }



  abrirDialogCadastro() {
    const dialogRef = this.dialog.open(NovoLugarComponent, {
      panelClass: 'dialog-lg',
      disableClose: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

}
