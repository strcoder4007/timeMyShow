import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SubsComponent } from './subs/subs.component';
import { EpisodeComponent } from './episode/episode.component';
import { SearchComponent } from './search/search.component';
import { AboutComponent } from './about/about.component';

const appRoutes: Routes = [
    { path: 'subs', component: SubsComponent },
    { path: 'about', component: AboutComponent },
    { path: 'search', component: SearchComponent },  
    { path: '',
        redirectTo: '/subs',
        pathMatch: 'full'
    }
  ];

@NgModule({
  declarations: [
    AppComponent,
    SubsComponent,
    EpisodeComponent,
    SearchComponent,
    AboutComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
