import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { PagesComponent } from './pages/pages.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { AuthorizationGuard } from './guards/auth.guard';
import { DevicesComponent } from './pages/devices/devices.component';
import { DeviceDetailComponent } from './pages/devices/device-detail/device-detail.component';

const routes: Routes = [
  {
    path:'',
    component:PagesComponent,
    canActivate: [AuthorizationGuard],
    children:[
      {path: '', component: HomeComponent},
      {path:'usuarios',component:UsuariosComponent},
      {path:'devices',component:DevicesComponent},
      {path:'device/:serie',component:DeviceDetailComponent}
    ]
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
