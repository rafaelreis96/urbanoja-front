import { Injectable } from '@angular/core';

export interface Alert {
  message: string;
  class: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  alerts: Alert[] = [];

  constructor() { }

  info(message: string) {
    this.alerts.push({ message: message, class: 'alert alert-info' });
  }

  success(message: string) {
    this.alerts.push({ message: message, class: 'alert alert-success' });
  }

  error(message: string) {
    this.alerts.push({ message: message, class: 'alert alert-danger' });
  }

  warning(message: string) {
    this.alerts.push({ message: message, class: 'alert alert-warning' });
  }

  clear(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

}
