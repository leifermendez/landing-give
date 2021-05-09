import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {UtilService} from '../util.service';
import {FacebookService, InitParams} from "ngx-facebook";

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {
  @ViewChild('asJoin') asJoin: ElementRef;
  @ViewChild('asVideo') asVideo: ElementRef;
  @ViewChild('asComments') asComments: ElementRef;
  private apiLoaded = false;
  playerVars: any;
  player: YT.Player;

  constructor(private utilService: UtilService, private renderer2: Renderer2, private fb: FacebookService) {
    const initParams: InitParams = {
      appId: '2832050400453938',
      xfbml: true,
      version: 'v10.0'
    };

    fb.init(initParams);
  }

  ngOnInit(): void {
    this.utilService.cbAction.subscribe(res => {
      this.initAnimate();
      this.player.playVideo();
    });

    this.playerVars = {
      controls: 1,
      rel: 0,
      showinfo: 0, // <- This part here
      fs: 0,
      cc_load_policy: 1,
      cc_lang_pref: 'es',
      iv_load_policy: 3
    };

    if (!this.apiLoaded) {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }

  initAnimate(): void {
    this.renderer2.addClass(this.asJoin.nativeElement, 'translate-bottom');
    this.renderer2.addClass(this.asComments.nativeElement, 'translate-bottom');
    this.renderer2.removeClass(this.asVideo.nativeElement, 'hide-video');
  }

  stopAnimate(): void {
    this.renderer2.removeClass(this.asJoin.nativeElement, 'translate-bottom');
    this.renderer2.removeClass(this.asComments.nativeElement, 'translate-bottom');
    this.renderer2.addClass(this.asVideo.nativeElement, 'hide-video');
  }

  move(a): void {
    this.utilService.cbAction.emit({a});
  }

  setPlayer($event: YT.PlayerEvent): void {
    this.player = $event.target;
    // $event.target.setPlaybackQuality('hd720');
  }

  closeVideo(): void {
    this.player.pauseVideo();
    this.stopAnimate();
  }

  test($event: YT.OnStateChangeEvent): void {
    console.log($event);
  }
}