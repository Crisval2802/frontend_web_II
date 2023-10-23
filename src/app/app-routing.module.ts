import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InicioComponent } from './pagina-principal/inicio/inicio.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RecuperarContraComponent } from './recuperar-contra/recuperar-contra.component';
import { CorreoEnviadoComponent } from './correo-enviado/correo-enviado.component';
import { RegistroComponent } from './registro/registro.component';


const routes: Routes = [
  {path:'login', component: InicioSesionComponent},
  {path:'inicio', component: InicioComponent},
  {path:'', redirectTo: '/inicio', pathMatch: 'full' },
  {path:'recuperar_contra', component: RecuperarContraComponent},
  {path:'correo_enviado', component: CorreoEnviadoComponent},
  {path:'registro', component: RegistroComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
