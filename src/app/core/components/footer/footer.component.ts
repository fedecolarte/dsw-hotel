import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  logos: string[] = [
     '../../../../assets/images/instagram_icon.png',
     '../../../../assets/images/facebook_icon.png',
     '../../../../assets/images/twitter_icon.png',
     '../../../../assets/images/youtube_icon.png'
  ]

  contacts : { icon: string, description: string }[] = [
    {
      icon: "phone",
      description: "FOOTER.TEL"
    },
    {
      icon: "email",
      description: "FOOTER.EMAIL"
    },
  ]
  

  constructor() { }

  ngOnInit(): void {
  }

}
