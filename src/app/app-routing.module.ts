import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard }  from './guards/auth.guard';
import { NologinGuard } from './guards/nologin.guard';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule'},
  { path: 'register', loadChildren: './pages/auth/register/register.module#RegisterPageModule'},
  { path: 'forgot', loadChildren: './pages/auth/forgot/forgot.module#ForgotPageModule'},
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
]; 

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
