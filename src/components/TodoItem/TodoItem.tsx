import { FC } from "react";
import { IoCheckmark } from "react-icons/io5";

import { Todo } from "../../types/todos";
import styles from "./TodoItem.module.css";

interface TodoItemProps {
	todo: Todo;
	onChangeTodoStatus: (id: string) => void;
}

const TodoItem: FC<TodoItemProps> = ({ todo, onChangeTodoStatus }) => {
	const { id, title, isCompleted } = todo;

	const handleChangeStatus = () => {
		onChangeTodoStatus(id);
	};

	return (
		<div
			className={`${styles.todo} ${
				isCompleted ? styles.done : styles.undone
			}`}
			data-testid={"todo"}
		>
			<div
				className={styles.checkbox}
				onClick={handleChangeStatus}
			>
				{isCompleted ? (
					<IoCheckmark
						color='#77c0af'
						size='25px'
					/>
				) : (
					""
				)}
			</div>
			<h2 className={styles.title}>{title}</h2>
		</div>
	);
};

export default TodoItem;
