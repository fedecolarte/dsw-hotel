import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
    public isMobile$: Observable<boolean> = this.breakpointObserver.observe('(min-width:768px)')
    .pipe(map(result => !result.matches));
    public isDesktop$: Observable<boolean> = this.breakpointObserver.observe('(min-width: 768px)')
    .pipe(map(result => result.matches));

    constructor(private breakpointObserver: BreakpointObserver) {
    }
}
