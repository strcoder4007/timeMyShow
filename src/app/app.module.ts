import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SubsComponent } from './subs/subs.component';
import { SearchComponent } from './search/search.component';

const appRoutes: Routes = [
    { path: 'subs', component: SubsComponent },
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
    SearchComponent
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
