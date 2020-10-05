export const deleteFilter = ( items, id ) => {
	return items.filter( item => item.id !== id );
};

export const findItem = ( items, id ) => {
	return items.find( item => item.id === id );
};
export const findCategoryByName = ( items, name ) => {
	return items.find( cat => cat.name === name );
};

export const updateItems = ( items, body ) => {
	return items.map( item => item.id === body.id ? body : item );
};

export const findSameField = ( items, value ) => {
	return items.some( err => err.name.toLowerCase() === value.toLowerCase() );
};

export  const createArrayForPostTransaction = (arr) => {
	return arr.map(e => ({id:e.id, quantity:e.quantity}))
}