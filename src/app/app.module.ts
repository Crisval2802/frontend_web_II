import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule} from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PaginaPrincipalModule } from './pagina-principal/pagina-principal.module';
import { ApiLoginService } from './servicios/api-login.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {AndroidPermissions} from "@ionic-native/android-permissions/ngx"

//Angular Material
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule}  from '@angular/material/snack-bar';

import {MatToolbarModule} from '@angular/material/toolbar';

import { RecuperarContraComponent } from './recuperar-contra/recuperar-contra.component';
import { CorreoEnviadoComponent } from './correo-enviado/correo-enviado.component';
import { RegistroComponent } from './registro/registro.component';
import { BarraSuperiorLoginComponent } from './barra-superior-login/barra-superior-login.component';



@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
    RecuperarContraComponent,
    CorreoEnviadoComponent,
    RegistroComponent,
    BarraSuperiorLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NoopAnimationsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFTOKEN',
    }),
    PaginaPrincipalModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatToolbarModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiLoginService,
    multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
