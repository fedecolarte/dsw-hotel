import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary-and-payment',
  templateUrl: './summary-and-payment.component.html',
  styleUrls: ['./summary-and-payment.component.scss']
})
export class SummaryAndPaymentComponent implements OnInit {

  paymentImg: string;

  constructor() {
    this.paymentImg = '../../../assets/images/reserve/payment.svg'
  }


  ngOnInit(): void {

  }

  goBack(): void {
  }
}
