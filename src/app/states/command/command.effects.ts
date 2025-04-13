import { inject, Injectable } from '@angular/core';
import { CommandeService } from '../../services/commande.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as commandActions from './command.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class CommandEffect {
  private api = inject(CommandeService);
  actions = inject(Actions);

  //load commandes
  loadCommands$ = createEffect(() =>
    this.actions.pipe(
      ofType(commandActions.getListCommands),
      switchMap(() =>
        this.api.getAllCommandes().pipe(
          map((commandes) =>
            commandActions.getListCommandsSuccess({ commandes })
          ),
          catchError((error) => of(commandActions.commandFailure({ error })))
        )
      )
    )
  );

  //Add commande
  addCommande$ = createEffect(() =>
    this.actions.pipe(
      ofType(commandActions.addCommand),
      switchMap(({ cmd }) =>
        this.api
          .addCommand(cmd)
          .pipe(map(() => commandActions.getListCommands()))
      )
    )
  );

  //delete commande
  deleteCommande$ = createEffect(() =>
    this.actions.pipe(
      ofType(commandActions.deleteCommand),
      switchMap(({ id }) =>
        this.api
          .deleteCommand(id)
          .pipe(map(() => commandActions.getListCommands()))
      )
    )
  );
}
