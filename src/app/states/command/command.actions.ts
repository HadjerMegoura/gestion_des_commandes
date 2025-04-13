import { createAction, props } from '@ngrx/store';
import { Commande } from '../../models/command';

export const getListCommands = createAction(
  '[ Command Component ] getListCommands'
);
export const addCommand = createAction(
  '[ Command Component ] addtCommand',
  props<{ cmd: Commande }>()
);
export const deleteCommand = createAction(
  '[ Command Component ] deleteCommand',
  props<{ id: string }>()
);

export const getListCommandsSuccess = createAction(
  '[ Command API ] getListCommands Success',
  props<{ commandes: Commande[] }>()
);

export const addCommandSuccess = createAction(
  '[ Command API ] addCommand Success'
);

export const deleteCommandSuccess = createAction(
  '[ Command API ] deleteCommand Success'
);

export const commandFailure = createAction(
  '[ Command API ] Command Failure',
  props<{ error: any }>()
);
