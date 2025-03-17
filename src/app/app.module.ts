import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';
import { AboutusComponent } from './features/pages/aboutus/aboutus.component';
import { LoginComponent } from './core/components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ProductlistComponent } from './features/productlist/productlist.component';
import { ProductsetupComponent } from './features/productsetup/productsetup.component';
import { OrderlistComponent } from './features/orderlist/orderlist.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,    
    SidebarComponent,
    AboutusComponent,
    LoginComponent,
    ProductlistComponent,
    ProductsetupComponent,
    OrderlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    HttpClientModule,   
    BrowserAnimationsModule,

 
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar:true,
      progressAnimation:'increasing'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
