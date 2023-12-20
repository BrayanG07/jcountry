import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './shared/components/home-page/home-page.component';
import { AboutPageComponent } from './shared/components/about-page/about-page.component';
import { ContactPageComponent } from './shared/components/contact-page/contact-page.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: HomePageComponent
  // },
  {
    path: 'about',
    component: AboutPageComponent
  },
  {
    path: 'contact',
    component: ContactPageComponent
  },
  {
    path: 'countries',
    /*
      ? Implementando Lazy-load(Carga peresosa)
      ? Importamos  countries.module porque el ya importa o tiene el countries-routing.module
    */
    loadChildren: () => import('./countries/countries.module').then(m => m.CountriesModule),
  },
  {
    path: '**', // ? ** Esto significa que si accede a cualquier ruta
    redirectTo: 'countries'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
