import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowComponent }  from './pets/show/show.component';
import { NewComponent }   from './pets/new/new.component';
import { EditComponent }  from './pets/edit/edit.component';
import { ViewComponent }  from './pets/view/view.component';

const routes: Routes = [
//all routes here
  { path: '', pathMatch: 'full', component: ShowComponent },
  { path: 'show',          component: ShowComponent },
  { path: 'new',  			component: NewComponent },
  { path: 'edit/:id',      component: EditComponent },
  { path: 'details/:id',    component: ViewComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
