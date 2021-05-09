import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {HomeSectionComponent} from './home-section/home-section.component';
import {YouTubePlayerModule} from '@angular/youtube-player';
import { JoinComponent } from './join/join.component';
import { FooterComponent } from './footer/footer.component';
import {CountUpModule} from "ngx-countup";
import {FacebookModule} from "ngx-facebook";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeSectionComponent,
    JoinComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    YouTubePlayerModule,
    CountUpModule,
    FacebookModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
