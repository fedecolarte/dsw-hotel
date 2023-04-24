import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  instagramLogo: string = '../../../../assets/images/instagram_icon.png'
  facebookLogo: string = '../../../../assets/images/facebook_icon.png'
  twitterLogo: string = '../../../../assets/images/twitter_icon.png'
  youtubeLogo: string = '../../../../assets/images/youtube_icon.png'

  constructor() { }

  ngOnInit(): void {
  }

}
