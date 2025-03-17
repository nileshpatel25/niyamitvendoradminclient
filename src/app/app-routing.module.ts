import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../app/core/guards/auth.guard';
import { DashboardComponent } from './features/pages/dashboard/dashboard.component';
import {  
  ROUTE_DASHBOARD, 
  ROUTE_LOGIN,  
  ROUTE_SIGNUP
} from './core/constants/routes';
import { HeaderComponent } from './core/components/header/header.component';
import { LoginComponent } from './core/components/login/login.component';
import { ProductlistComponent } from './features/productlist/productlist.component';
import { ProductsetupComponent } from './features/productsetup/productsetup.component';
import { OrderlistComponent } from './features/orderlist/orderlist.component';
const routes: Routes = [
  // {
  //   path: ROUTE_LOGIN,
  //   loadChildren: () =>
  //     import('./features/accounts/login/login.module').then(
  //       (m) => m.LoginModule
  //     ),
  // },
  // {
  //   path: ROUTE_SIGNUP,
  //   loadChildren: () =>
  //     import('./features/accounts/sign-up/sign-up.module').then(
  //       (m) => m.SignUpModule
  //     ),
  // },
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  // {
  //   path: ROUTE_DASHBOARD,
  //   component: DashboardComponent,
  //   pathMatch: 'full',
  //   canActivate: [AuthGuard],
  // },
  {path:'login', component:LoginComponent},
  {path:'',component:HeaderComponent,
    children: [
      {path:'dashboard',component:DashboardComponent},
      {path:'productlist',component:ProductlistComponent},
      {path:'productsetup',component:ProductsetupComponent},
      {path:'orderlist',component:OrderlistComponent},

    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
