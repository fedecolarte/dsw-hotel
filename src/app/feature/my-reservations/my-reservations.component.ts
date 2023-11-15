import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReserveInfoView } from '@app/core/entities/views/reserve-info.view';
import { ReserveService } from '@app/core/services/reserve.service';
import { UserService } from '@app/core/services/user.service';
import { concatMap, take } from 'rxjs';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.scss']
})
export class MyReservationsComponent implements OnInit {

  reserves: ReserveInfoView[];

  constructor(
    public reserveService: ReserveService,
    private router: Router,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.userService.userLogged$.subscribe(user => {
      if(user) this.getReserveInfo(user);
      else this.router.navigate(['']);
    })
  }
  
  getReserveInfo(user: string): void {
    this.userService.getUserInfo(user).pipe(
      concatMap((user) => this.reserveService.getReservesByDocument(user.documentNumber))).
       subscribe(response => {
          this.reserves = response;
        }
       )
  }

  goBack(): void {
    this.router.navigate(['/reservas']);
  }

}
