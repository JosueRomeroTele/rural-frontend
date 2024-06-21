import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { NgxChartsModule } from "@swimlane/ngx-charts";
import {MatTableModule} from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './layouts/toolbar/toolbar.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { PagesComponent } from './pages/pages.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTreeModule} from '@angular/material/tree';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { AuthenticationService } from './services/security/authentication.service';
import { AuthApiService } from './services/security/auth-api.service';
import { ModalMensajeComponent } from './components/modal-mensaje/modal-mensaje.component';
import { LoadingButtonComponent } from './components/loading-button/loading-button.component';
import { DevicesComponent } from './pages/devices/devices.component';
import { PagetitleComponent } from './shared/pagetitle/pagetitle.component';
import { EditAddUsuarioComponent } from './pages/usuarios/edit-add-usuario/edit-add-usuario.component';
@NgModule({
  declarations: [
    PagetitleComponent,
    AppComponent,
    ToolbarComponent,
    SidebarComponent,
    HomeComponent,
    UsuariosComponent,
    PagesComponent,
    LoginComponent,
    RegisterComponent,
    ModalMensajeComponent,
    LoadingButtonComponent,
    DevicesComponent,
    EditAddUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatTreeModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    CommonModule,
    NgxChartsModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule
  ],
  providers: [
    AuthenticationService,
    AuthApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
