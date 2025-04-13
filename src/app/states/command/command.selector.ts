import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const cmdStateSelector = (state: AppState) => state.commande;

export const selectCommande = createSelector(
  cmdStateSelector,
  (state) => state.listCommandes
);
