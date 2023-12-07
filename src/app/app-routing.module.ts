import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InicioComponent } from './pagina-principal/inicio/inicio.component';

import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RecuperarContraComponent } from './recuperar-contra/recuperar-contra.component';
import { CorreoEnviadoComponent } from './correo-enviado/correo-enviado.component';
import { RegistroComponent } from './registro/registro.component';
import { PaginaUsuarioComponent } from './pagina-principal/pagina-usuario/pagina-usuario.component';
import { CuentasComponent } from './pagina-principal/cuentas/cuentas.component';
import { CategoriasComponent } from './pagina-principal/categorias/categorias.component';
import { HistorialComponent } from './pagina-principal/historial/historial.component';
import { LimitesComponent } from './pagina-principal/limites/limites.component';
import { ObjetivosComponent } from './pagina-principal/objetivos/objetivos.component';
import { PagosCuotasComponent } from './pagina-principal/pagos-cuotas/pagos-cuotas.component';


const routes: Routes = [
  {path:'login', component: InicioSesionComponent},
  {path:'inicio', component: InicioComponent},
  {path:'', redirectTo: '/inicio', pathMatch: 'full' },
  {path:'recuperar_contra', component: RecuperarContraComponent},
  {path:'correo_enviado', component: CorreoEnviadoComponent},
  {path:'registro', component: RegistroComponent},
  {path:'usuario', component: PaginaUsuarioComponent},
  {path:'cuentas', component: CuentasComponent},
  {path:'categorias', component: CategoriasComponent},
  {path:'historial', component: HistorialComponent},
  {path: "limites", component: LimitesComponent},
  {path: "objetivos", component: ObjetivosComponent},
  {path: "cuotas", component: PagosCuotasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
