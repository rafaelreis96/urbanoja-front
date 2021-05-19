import { Component, OnInit } from '@angular/core';
import { AlertsService, Alert } from './alerts.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  alerts: Alert[] = [];

  constructor(private alertsService: AlertsService) { }

  ngOnInit() {
    this.alerts = this.alertsService.alerts;
  }

  clear(alert) {
    this.alertsService.clear(alert);
  }

}
