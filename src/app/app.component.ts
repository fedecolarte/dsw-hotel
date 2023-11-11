import { Component, HostListener, OnInit } from '@angular/core';
import { BreakpointService } from './core/services/breakpoint.service';
import { UserService } from './core/services/user.service';
import { StoreService } from './core/services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'dsw-hotel';

  constructor(public breakpointService: BreakpointService, private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.initToken();
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: any) {
    this.storeService.token$.subscribe(token => {
      console.log(token);
      const isTokenExpired = this.storeService.isTokenExpired(token);
      if(!isTokenExpired && token) localStorage.setItem('auth', token);
      else {
        localStorage.clear();
        this.storeService.setToken(null);
      }
    })
  }
}
