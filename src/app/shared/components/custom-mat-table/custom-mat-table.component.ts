import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ContentChildren, QueryList, SimpleChanges } from '@angular/core';
import { MatTable, MatColumnDef, MatHeaderRowDef, MatRowDef, MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { ColumnItem, Pagination } from './custom-mat-table.model';

@Component({
  selector: 'app-custom-mat-table',
  templateUrl: './custom-mat-table.component.html',
  styleUrls: ['./custom-mat-table.component.scss']
})
export class CustomMatTableComponent implements OnInit {
  @Input() cols: ColumnItem[];
  @Input() data: any[];
  @Input() pagination: Pagination;
  @Input() auto = false;
  @Input() actionButtons = false;
  @Input() loading = false;
  @Input() shadow = false;
  @Input() updateTable = false;

  @Output('onActionDelete') eventDelete = new EventEmitter();
  @Output('onActionEdit') eventEdit = new EventEmitter();
  @Output('onPagination') eventPagination = new EventEmitter();

  @ContentChildren(MatHeaderRowDef) headerRowDefs: QueryList<MatHeaderRowDef>;
  @ContentChildren(MatRowDef) rowDefs: QueryList<MatRowDef<any>>;
  @ContentChildren(MatColumnDef) columnDefs: QueryList<MatColumnDef>;
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  dataSource: MatTableDataSource<any>;
  sizeOptions = [ 15, 25, 35, 50];
  colsName: string[];

  constructor() { }

  ngOnInit(): void {
    this.colsName = this.cols.map(item => item.name);

    if(this.actionButtons) {
      this.cols.push({name: 'action', label: 'Ação'});
      this.colsName.push('action');
    }

    //desabilitar spinner
    setTimeout( ()=> this.loading = false, 3000);
  }

  ngAfterContentInit() {
    this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));
    this.rowDefs.forEach(rowDef => this.table.addRowDef(rowDef));
    this.headerRowDefs.forEach(headerRowDef => this.table.addHeaderRowDef(headerRowDef));
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['data']) {

      if(Array.isArray(this.data) && this.data.length > 0) {
        this.loading = false;
      }

      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource._updateChangeSubscription();
    }

  }


  getValueColumn(item: Object, name: string) {
    if(item.hasOwnProperty(name)){
      if( item[name] !== null && typeof item[name] !== 'string' && typeof item[name] !== 'number') {
        return 'Format not Supported';
      }

      return item[name];

    } else {
      return  'Prop. not exist';
    }

  }

  editar(item: any) {
    this.eventEdit.emit(item);
  }

  updateDataTable(item: any) {
    const position = this.dataSource.data.indexOf(item);

    if(position >= 0) {
      this.dataSource.data[position] = item;
    } else {
      this.dataSource.data.push(item);
    }

    this.dataSource._updateChangeSubscription();
  }

  remover(item: any) {
    const confirmar = confirm("Confirmar Exclusão?");

    if(confirmar) {
      this.eventDelete.emit(item);
      this.dataSource.data.splice(this.dataSource.data.indexOf(item), 1);
      this.dataSource._updateChangeSubscription();
    }
  }

  pageEvent(pageEvent: PageEvent) {
    this.eventPagination.emit(pageEvent);
    console.log(pageEvent)
  }

}
