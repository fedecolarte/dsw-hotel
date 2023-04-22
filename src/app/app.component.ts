import { Component } from '@angular/core';
import { BreakpointService } from './core/services/breakpoint.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dsw-hotel';

  constructor(public breakpointService: BreakpointService) {}
}
