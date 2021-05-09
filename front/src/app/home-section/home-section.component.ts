import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {UtilService} from "../util.service";

@Component({
  selector: 'app-home-section',
  templateUrl: './home-section.component.html',
  styleUrls: ['./home-section.component.scss']
})
export class HomeSectionComponent implements OnInit {
  @ViewChild('asHome') asHome: ElementRef
  showCase = false;


  constructor(private utilService: UtilService, private renderer2: Renderer2) {
  }

  ngOnInit(): void {
    this.utilService.cbAction.subscribe(({a}) => {
      (a) ? this.initAnimate() : this.stopAnimate();
    });
  }

  move(a): void {
    this.utilService.cbAction.emit({a})
  }

  initAnimate(): void {
    this.renderer2.addClass(this.asHome.nativeElement, 'translate-top')
  }

  stopAnimate(): void {
    this.renderer2.removeClass(this.asHome.nativeElement, 'translate-top')
  }

  cbShowCase = () => this.showCase = !this.showCase
}
