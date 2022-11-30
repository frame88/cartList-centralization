import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/login/auth.guard';

const routes: Routes = [

  // {
  //   path:'',
  //   redirectTo: 'chat/',
  //   pathMatch: 'full',
  // },
  {
    path: 'nuovapagina',
    loadChildren: () => import('./nuovapagina/nuovapagina.module').then( m => m.NuovapaginaPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'nuovapagina/:id',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'update/:id',
    loadChildren: () => import('./update/update.module').then( m => m.UpdatePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./core/login/login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'detail',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'update',
    loadChildren: () => import('./update/update.module').then( m => m.UpdatePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'new',
    loadChildren: () => import('./new/new.module').then( m => m.NewPageModule),
    canActivate: [AuthGuard],
  },
  /*
  {
    path: '**',
    redirectTo:'login',
    // pathMatch: 'full',
  },*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
