export const EMPTY_STRING = '';

export const INITIAL_STATE = {
  description: EMPTY_STRING,
  quantity: 1,
};

export const MAX_QUANTITY = 20;

export const SORTING_SETINGS = {
  input: 'input',
  descriptions: 'descriptions',
  packed: 'packed',
};

export const ACTIONS_OPTIONS = [
  { id: 1, name: 'Sort by input order', type: SORTING_SETINGS.input },
  { id: 2, name: 'Sort by description', type: SORTING_SETINGS.descriptions },
  { id: 3, name: 'Sort by packed items', type: SORTING_SETINGS.packed },
];
