import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'
import { PetService } from './pet.service'

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PetsComponent } from './pets/pets.component';
import { ShowComponent } from './pets/show/show.component';
import { NewComponent } from './pets/new/new.component';
import { EditComponent } from './pets/edit/edit.component';
import { ViewComponent } from './pets/view/view.component';


@NgModule({
  declarations: [
    AppComponent,
    PetsComponent,
    ShowComponent,
    NewComponent,
    EditComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [PetService],
  bootstrap: [AppComponent]
})
export class AppModule { }






////COPY AND PASTED

