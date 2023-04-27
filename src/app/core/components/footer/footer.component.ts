import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  logos = [
     '../../../../assets/images/instagram_icon.png',
     '../../../../assets/images/facebook_icon.png',
     '../../../../assets/images/twitter_icon.png',
     '../../../../assets/images/youtube_icon.png'
  ]
  

  constructor() { }

  ngOnInit(): void {
  }

}
