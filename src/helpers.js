
export const itemPosition = (list, itemId) => list.findIndex(current => current.id === itemId);

export const findItem = (list, itemId) =>  list.filter(current => current.id === itemId)[0];