import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then(m => m.SplashPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.InicioPageModule)
      },
      {
        path: 'fotos',
        loadChildren: () => import('./pages/fotos/fotos.module').then(m => m.FotosPageModule)
      },
      {
        path: 'graficos',
        loadChildren: () => import('./pages/graficos/graficos.module').then(m => m.GraficosPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}