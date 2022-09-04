import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { WrapperModule } from '@trip-expense-calculator/frontend/feature-wrapper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [AppComponent, NotFoundComponent, ModalComponent],
  imports: [BrowserModule, HttpClientModule, FlexLayoutModule, AppRoutingModule, WrapperModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
