import { Component, OnInit } from '@angular/core';
import { BreakpointService } from '@app/core/services/breakpoint.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  hotelLogo: string = '../../../../assets/images/temporal-logo.png'
  isMenuCollapsed: boolean = true;
  tabs = [
    {
      name: 'Inicio',
      icon: 'cottage',
      link: ''
    },
    {
      name: 'Reservas',
      icon: 'luggage',
      link: '/reservas'
    },
    {
      name: 'Tipos de Habitación',
      icon: 'bed',
      link: '/tipos-habitacion'
    },
    {
      name: 'Contacto',
      icon: 'contact_support',
      link: '/contacto'
    },
    {
      name: 'Ingresar'
    }
  ]
  
  constructor(public breakpointService: BreakpointService) { }

  ngOnInit(): void {
  }

  collapseMenu(): void{
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }
}
