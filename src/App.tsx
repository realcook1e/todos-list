import { useState } from "react";
import TodoInput from "./components/TodoInput/TodoInput";
import { Filter, Todo } from "./types/todos";
import TodoList from "./components/TodoList/TodoList";
import BottomBar from "./components/BottomBar/BottomBar";

function App() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [isTodosShowed, setIsTodosShowed] = useState(true);
	const [filter, setFilter] = useState<Filter>("all");

	const handleAddTodo = (todo: Todo) => {
		setTodos([...todos, todo]);
	};

	const handleChangeTodoStatus = (id: string) => {
		setTodos(prev =>
			prev.map(todo => {
				if (todo.id === id) {
					return { ...todo, isCompleted: !todo.isCompleted };
				}
				return todo;
			})
		);
	};

	const handleClearCompleted = () => {
		setTodos(todos.filter(todo => !todo.isCompleted));
	};

	const getTodosLeft = () => {
		return todos.filter(todo => !todo.isCompleted).length;
	};

	const handleTodosFilter = () => {
		if (filter === "completed") {
			return todos.filter(todo => todo.isCompleted);
		}
		if (filter === "active") {
			return todos.filter(todo => !todo.isCompleted);
		}
		return todos;
	};

	return (
		<div className='app'>
			<h1 className='title'>todos</h1>
			<div className='todos'>
				<TodoInput
					onAddTodo={handleAddTodo}
					onSetIsTodosShowed={setIsTodosShowed}
					isTodosShowed={isTodosShowed}
				/>
				<TodoList
					todos={handleTodosFilter()}
					isOpened={isTodosShowed}
					onChangeTodoStatus={handleChangeTodoStatus}
				/>
				<BottomBar
					todosLeft={getTodosLeft()}
					onClearCompleted={handleClearCompleted}
					filter={filter}
					onSetFilter={setFilter}
				/>
			</div>
		</div>
	);
}

export default App;
