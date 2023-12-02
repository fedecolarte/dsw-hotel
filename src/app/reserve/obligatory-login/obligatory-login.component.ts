import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '@app/core/components/login/login.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-obligatory-login',
  templateUrl: './obligatory-login.component.html',
  styleUrls: ['./obligatory-login.component.scss']
})
export class ObligatoryLoginComponent implements OnInit {

  obligatoryImg: string = "../../../assets/images/reserve/obligatory_login.svg"

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
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

  goBack(): void {
    
  }

}
