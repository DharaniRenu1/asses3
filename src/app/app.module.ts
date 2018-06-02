import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import 'hammerjs';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing/app-routing.module'
import { DishService } from './services/dish.service';
import { PromotionsService } from './services/promotions.service';
import { LeaderService } from './services/leader.service';
import { LoginComponent } from './login/login.component';
import { HttpModule } from '@angular/http';
import { baseURL } from './shared/baseurl';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { RestangularConfigFactory } from './shared/restConfig';
import { HighlightDirective } from './directives/highlight.directive';
import { ProcessHttpmsgService } from './services/process-httpmsg.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    HighlightDirective,
  
     ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    FormsModule,
     ReactiveFormsModule,
     HttpModule,
     RestangularModule.forRoot(RestangularConfigFactory),

  
  ],
  providers: [DishService,PromotionsService,LeaderService,ProcessHttpmsgService,{provide: 'BaseURL', useValue: baseURL},
],
  entryComponents:[
   LoginComponent, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
