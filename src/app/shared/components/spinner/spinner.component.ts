import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  imgSource: string;

  @Input() inside: boolean;
  @Input() message: string;
  @Input() relative?: boolean;
  @Input() className: string;
  @Input() height?: string;
  @Input() width?: string;
  @Input() center?: boolean;

  constructor() { 
    this.imgSource = '../../../../assets/spinner/spinner.svg'
  }

  ngOnInit(): void {
  }

}
