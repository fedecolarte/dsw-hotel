import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  hotelLogo: string = '../../../../assets/images/temporal-logo.png'
  isMenuCollapsed: boolean = true;
  
  constructor(public breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
  }

  collapseMenu(): void{
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }
}
