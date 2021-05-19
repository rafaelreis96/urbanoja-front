import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-cancelar',
  templateUrl: './button-cancelar.component.html',
  styleUrls: ['./button-cancelar.component.scss']
})
export class ButtonCancelarComponent implements OnInit {
  @Input() label = 'Cancelar';

  constructor() { }

  ngOnInit() {
  }

}
