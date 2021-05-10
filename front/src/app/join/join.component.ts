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
  steps: Array<string> = [];
  secondsCounter = 0;
  menuSteps: Array<any> = []

  constructor(private utilService: UtilService, private renderer2: Renderer2, private fb: FacebookService) {
    const initParams: InitParams = {
      appId: '2832050400453938',
      xfbml: true,
      version: 'v10.0'
    };

    fb.init(initParams);
  }

  ngOnInit(): void {
    this.steps = ['STEP_1'];
    this.menuSteps = [
      {
        icon: '<i class="uil uil-facebook-f"></i>',
        label: 'Conectar Facebook',
        class: 'fb-btn btn-step-1'
      },
      {
        icon: '<i class="uil uil-comments-alt"></i>',
        label: 'Comentar Post',
        class: 'fb-btn-second btn-step-2'
      }
    ]

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
    const {data} = $event;
    if (data === 3) {
      this.getDuration();
    }
    console.log($event);

  }

  setPulse(name): void {
    const element = document.querySelector(name);
  }

  getDuration(): void {
    const seconds = this.player.getDuration();
    // const flagCount = setInterval(() => {
    //   this.secondsCounter += 1;
    //   if (this.secondsCounter === 6) {
    //     // this.steps.push('STEP_2');
    //     console.log(this.steps)
    //     this.renderer2.addClass(this.asJoin, 'pulse')
    //     clearInterval(flagCount)
    //   }
    //   console.log(this.secondsCounter)
    // }, 1000);
  }
}
