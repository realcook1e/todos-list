import { FC } from "react";

import { Todo } from "../../types/todos";
import TodoItem from "../TodoItem/TodoItem";
import styles from "./TodoList.module.css";

interface TodoListProps {
	todos: Todo[];
	isOpened: boolean;
	onChangeTodoStatus: (id: string) => void;
}

const TodoList: FC<TodoListProps> = ({
	todos,
	isOpened,
	onChangeTodoStatus,
}) => {
	return (
		<div
			className={`${styles.list} ${
				isOpened ? styles.opened : styles.hidden
			} ${styles.todoList}`}
		>
			{todos.map(todo => (
				<TodoItem
					key={todo.id}
					onChangeTodoStatus={onChangeTodoStatus}
					todo={todo}
				/>
			))}
		</div>
	);
};

export default TodoList;
