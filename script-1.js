// reducer
function todos(state = [], action) {
	if (action.type === 'ADD_TODO') {
		return state.concat([action.todo]);
	}

	return state;
}

// store
function createStore() {
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
		state = todos(state, action);
		listeners.forEach(listener => listener());
	};

	return {
		getState,
		subscribe,
		dispatch,
	};
}

const store = createStore();

console.log(store);

const unsbscribe = store.subscribe(() => {
	console.log('The new state is: ', store.getState());
});

store.dispatch({
	type: 'ADD_TODO',
	todo: {
		id: 0,
		name: 'Learn Redux',
		complete: false,
	},
});

store.dispatch({
	type: 'ADD_TODO',
	todo: {
		id: 1,
		name: 'Learn Redux 1',
		complete: false,
	},
});

unsbscribe();

store.dispatch({
	type: 'ADD_TODO',
	todo: {
		id: 3,
		name: 'Learn Redux 3',
		complete: false,
	},
});
