import { NgModule } from '@angular/core';
import { ClipService } from './services/clip.service';
import { HomeComponent } from './home/home.component';
import { ClipComponent } from './clip/clip.component';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'about', // example.com/about
    component: AboutComponent,
    pathMatch: 'full'
  },
  {
    path: 'clip/:id',
    component: ClipComponent,
    resolve: {
      clip: ClipService
    },
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: async () => (await import('./video/video.module')).VideoModule,
  },
  {
    path: '**',
    component: NotFoundComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
