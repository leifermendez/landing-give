import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {HomeSectionComponent} from './home-section/home-section.component';
import {YouTubePlayerModule} from '@angular/youtube-player';
import {JoinComponent} from './join/join.component';
import {FooterComponent} from './footer/footer.component';
import {CountUpModule} from "ngx-countup";
import {FacebookModule} from "ngx-facebook";
import {HttpClientModule} from "@angular/common/http";
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeSectionComponent,
    JoinComponent,
    FooterComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    YouTubePlayerModule,
    CountUpModule,
    HttpClientModule,
    FacebookModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
