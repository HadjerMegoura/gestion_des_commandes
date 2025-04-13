import { createReducer, on } from '@ngrx/store';
import { Commande } from '../../models/command';
import {
  addCommand,
  commandFailure,
  deleteCommand,
  getListCommands,
  getListCommandsSuccess,
} from './command.actions';

export interface CommandState {
  listCommandes: Commande[];
}

export const initializeCommandeState: CommandState = {
  listCommandes: [],
};

export const commandReducer = createReducer(
  initializeCommandeState,
  on(getListCommands, (state) => ({
    ...state,
    listCommandes: state.listCommandes,
  })),
  on(addCommand, (state, { cmd }) => ({
    ...state,
    listCommandes: [...state.listCommandes, cmd],
  })),
  on(deleteCommand, (state, { id }) => ({
    ...state,
    listCommandes: state.listCommandes.filter((cmd) => {
      return cmd.id !== id;
    }),
  })),

  // When we get the commandes list from the API
  on(getListCommandsSuccess, (state, { commandes }) => ({
    ...state,
    commandes,
    error: null,
  })),

  // If there's an error
  on(commandFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
