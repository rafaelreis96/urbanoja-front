import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-salvar',
  templateUrl: './button-salvar.component.html',
  styleUrls: ['./button-salvar.component.scss']
})
export class ButtonSalvarComponent implements OnInit {
  @Input() label = 'Salvar';
  @Input() type = 'button';

  constructor() { }

  ngOnInit() {
  }

}
