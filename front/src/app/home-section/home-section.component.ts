import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {UtilService} from "../util.service";
import Typewriter from 't-writer.js';

@Component({
  selector: 'app-home-section',
  templateUrl: './home-section.component.html',
  styleUrls: ['./home-section.component.scss']
})
export class HomeSectionComponent implements OnInit, AfterViewInit {
  @ViewChild('asHome') asHome: ElementRef;
  @ViewChild('asTitle') asTitle: ElementRef;
  showCase = false;
  menuSteps: Array<any> = []


  constructor(private utilService: UtilService, private renderer2: Renderer2) {
  }

  ngOnInit(): void {
    this.utilService.cbAction.subscribe(({a}) => {
      (a) ? this.initAnimate() : this.stopAnimate();
    });

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
      },
      {
        icon: '<i class="uil uil-youtube"></i>',
        label: 'Comentar Post',
        class: 'fb-btn-third btn-step-3'
      }
    ]
  }

  ngAfterViewInit(): void {
    this.typeEffect()
  }

  move(a): void {
    this.utilService.cbAction.emit({a})
  }

  typeEffect(): void {
    const writer = new Typewriter(this.asTitle.nativeElement, {
      loop: false,
      typeColor: 'white'
    })

    writer
      .changeCursorColor('white')
      .type('Dime tú <br>opinión')
      .changeOps({ deleteSpeed: 80 })
      .start()
  }

  initAnimate(): void {
    this.renderer2.addClass(this.asHome.nativeElement, 'translate-top')
  }

  stopAnimate(): void {
    this.renderer2.removeClass(this.asHome.nativeElement, 'translate-top')
  }

  cbShowCase = () => this.showCase = !this.showCase
}
