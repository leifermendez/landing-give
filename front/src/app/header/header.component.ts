import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {UtilService} from "../util.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('asHeader') asHeader: ElementRef
  links: Array<any> = []

  constructor(private utilService: UtilService, private renderer2: Renderer2) {
  }

  ngOnInit(): void {

    this.utilService.cbAction.subscribe(({a}) => {
      (a) ? this.initAnimate() : this.stopAnimate();
    });


    this.links = [
      {
        icon: '<i class="uil uil-youtube"></i>',
        name: 'Youtube',
        link: 'youtube.com/leifermendez'
      },
      {
        icon: '<i class="uil uil-linkedin"></i>',
        name: 'Linkedin',
        link: 'github.com/leifermendez'
      },
      {
        icon: '<i class="uil uil-facebook"></i>',
        name: 'Facebook',
        link: 'facebook.com/leifermendez.dev'
      },
      {
        icon: '<i class="uil uil-github"></i>',
        name: 'Github',
        link: 'github.com/leifermendez'
      }
    ]
  }


  initAnimate(): void {
    this.renderer2.addClass(this.asHeader.nativeElement, 'translate-top')
  }

  stopAnimate(): void {
    this.renderer2.removeClass(this.asHeader.nativeElement, 'translate-top')
  }

}
