import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'layout',
    loadChildren: () =>
      import(`./layout/layout.module`).then((m) => m.LayoutModule),
  },
  {
    path: '',
    loadChildren: () => import(`./auth/auth.module`).then((m) => m.AuthModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
