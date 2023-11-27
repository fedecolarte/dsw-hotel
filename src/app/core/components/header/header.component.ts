import { Component, OnInit } from '@angular/core';
import { BreakpointService } from '@app/core/services/breakpoint.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { UserService } from '@app/core/services/user.service';
import { StoreService } from '@app/core/services/store.service';
import { Router } from '@angular/router';
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
      link: '',
      disabled: false
    },
    {
      name: 'Reservas',
      icon: 'luggage',
      link: '/reservas',
      disabled: false
    },
    {
      name: 'Tipos de Habitación',
      icon: 'bed',
      link: '/tipos-habitacion',
      disabled: true
    },
    {
      name: 'Contacto',
      icon: 'contact_support',
      link: '/contacto',
      disabled: false
    },
    {
      name: 'Ingresar'
    }
  ]
  
  constructor(
    public breakpointService: BreakpointService,
    public userService: UserService,
    private router: Router,
    private modalService: NgbModal,
    private storeService: StoreService
    ) { }

  ngOnInit(): void {
  }

  collapseMenu(): void{
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  openLogin(): void {
    const modalOptions = {
      size: 'md',
      centered: true,
      scrollable: false,
      fullscreen: 'sm',
      backdropClass: 'modal-backdrop-transparent'
    }

    this.modalService.open(LoginComponent, modalOptions);
  } 

  logout(): void {
    localStorage.clear();
    this.storeService.setToken(null);
    this.userService.setUserLogged(null);
  }

  goToHome(): void {
    this.router.navigate(['']);
  }

  goToMyReserves(): void {
    this.router.navigate(['/mis-reservas']);
  }
}
