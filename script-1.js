// reducer
function todos(state = [], action) {
	if (action.type === 'ADD_TODO') {
		return state.concat([action.todo]);
	}

	return state;
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
	todo: 'todo-1',
});
