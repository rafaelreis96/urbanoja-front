import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  title = 'Urbanoja';
  user: string;
  menuItems: any[];
  modeSidenav = 'side';

  constructor(){}

  ngOnInit() {
    this.menuItems = [
     // {label: 'Dashboard',      icon: 'dashboard',   router: '/'  },
      {label: 'Lugares',        icon: 'store',       router: '/admin/lugares'   },
     // {label: 'Categorias',     icon: 'category',    router: '/' },
     // {label: 'Usuarios',       icon: 'people',      router: '/'   },
    ];

  }

  logout() {

  }

}
