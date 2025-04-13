import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AsyncPipe } from '@angular/common';
import { AppComponent } from './app.component';
import { CommandeComponent } from './components/commande/commande.component';
import { FormsModule } from '@angular/forms';
import { commandReducer } from './states/command/command.reducers';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { CommandEffect } from './states/command/command.effects';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [AppComponent, CommandeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // nombre d'états à garder en historique
      logOnly: false, // true en prod pour ne pas modifier l'état depuis les DevTools
    }),
    AsyncPipe,
    FormsModule,
    StoreModule.forRoot({ commande: commandReducer }),
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatToolbarModule,
    HttpClientModule,
    EffectsModule.forRoot([CommandEffect]),
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
