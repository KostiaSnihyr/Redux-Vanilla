// reducer
function todos(state = [], action) {
	switch (action.type) {
		case 'ADD_TODO':
			return state.concat([action.todo]);
		case 'REMOVE_TODO':
			return state.filter(todo => todo.id !== action.id);
		case 'TOGGLE_TODO':
			return state.map(todo =>
				todo.id !== action.id
					? todo
					: Object.assign({}, todo, { complete: !todo.complete })
			);
		default:
			return state;
	}
}

// store
function createStore(reducer) {
	let state;
	let listeners = [];

	const getState = () => state;

	const subscribe = listener => {
		listeners.push(listener);
		return () => {
			listeners = listeners.filter(l => l !== listener);
		};
	};

	const dispatch = action => {
		state = reducer(state, action);
		listeners.forEach(listener => listener());
	};

	return {
		getState,
		subscribe,
		dispatch,
	};
}

const store = createStore(todos);

store.subscribe(() => {
	console.log(store.getState());
});

store.dispatch({
	type: 'ADD_TODO',
	todo: {
		id: 1,
		name: 'Learn Redux 1',
		complete: false,
	},
});

store.dispatch({
	type: 'ADD_TODO',
	todo: {
		id: 2,
		name: 'Learn Redux 2',
		complete: false,
	},
});

store.dispatch({
	type: 'ADD_TODO',
	todo: {
		id: 3,
		name: 'Learn Redux 3',
		complete: false,
	},
});

store.dispatch({
	type: 'REMOVE_TODO',
	id: 3,
});

store.dispatch({
	type: 'TOGGLE_TODO',
	id: 2,
});
