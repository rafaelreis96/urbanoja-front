import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-novo',
  templateUrl: './button-novo.component.html',
  styleUrls: ['./button-novo.component.scss']
})
export class ButtonNovoComponent implements OnInit {
  @Input() label = 'Novo';

  constructor() { }

  ngOnInit() {
  }

}
