function generateId() {
	return (
		Math.random().toString(36).substring(2) + new Date().getTime().toString(36)
	);
}

// App code
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

function addTodoAction(todo) {
	return {
		type: ADD_TODO,
		todo,
	};
}

function removeTodoAction(id) {
	return {
		type: REMOVE_TODO,
		id,
	};
}

function toggleTodoAction(id) {
	return {
		type: TOGGLE_TODO,
		id,
	};
}

function addGoalAction(goal) {
	return {
		type: ADD_GOAL,
		goal,
	};
}

function removeGoalAction(id) {
	return {
		type: REMOVE_GOAL,
		id,
	};
}

const checker = store => next => action => {
	if (
		action.type === ADD_TODO &&
		action.todo.name.toLowerCase().indexOf('space') !== -1
	) {
		return alert("trigger word 'space'");
	}

	if (
		action.type === ADD_GOAL &&
		action.goal.name.toLowerCase().indexOf('space') !== -1
	) {
		return alert("trigger word 'space'");
	}

	return next(action);
};

const logger = store => next => action => {
	console.group(action.type);
	console.log('The action: ', action);
	const result = next(action);
	console.log('The new state: ', store.getState());
	console.groupEnd();
	console.log('result: ', result);
	return result;
};

// reducer
function todos(state = [], action) {
	switch (action.type) {
		case ADD_TODO:
			return state.concat([action.todo]);
		case REMOVE_TODO:
			return state.filter(todo => todo.id !== action.id);
		case TOGGLE_TODO:
			return state.map(todo =>
				todo.id !== action.id
					? todo
					: Object.assign({}, todo, { complete: !todo.complete })
			);
		default:
			return state;
	}
}

function goals(state = [], action) {
	switch (action.type) {
		case ADD_GOAL:
			return state.concat([action.goal]);
		case REMOVE_GOAL:
			return state.filter(goal => goal.id !== action.id);
		default:
			return state;
	}
}

const store = Redux.createStore(
	Redux.combineReducers({
		todos,
		goals,
	}),
	Redux.applyMiddleware(checker, logger)
);
