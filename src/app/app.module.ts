import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PdfPlayerV2Module } from 'pdf-player-v2';
import { NavigationV2Module } from 'navigation-v2';
import { StartPageV2Module } from 'start-page-v2';
import { EndPageV2Module } from 'endpage-v2';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PdfPlayerV2Module,
    NavigationV2Module,
    StartPageV2Module,
    EndPageV2Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
