import {
	Dispatch,
	FC,
	KeyboardEvent,
	SetStateAction,
	useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { IconContext } from "react-icons";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdSend } from "react-icons/io";

import { Todo } from "../../types/todos";
import styles from "./TodoInput.module.css";

interface TodoInputProps {
	onAddTodo: (todo: Todo) => void;
	isTodosShowed: boolean;
	onSetIsTodosShowed: Dispatch<SetStateAction<boolean>>;
}

const TodoInput: FC<TodoInputProps> = ({
	onAddTodo,
	onSetIsTodosShowed,
	isTodosShowed,
}) => {
	const [todo, setTodo] = useState("");

	const handleAddTodo = () => {
		if (todo.trim() !== "") {
			onAddTodo({ id: uuidv4(), title: todo, isCompleted: false });
			setTodo("");
		}
	};

	const enterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleAddTodo();
		}
	};
	return (
		<IconContext.Provider value={{ size: "24px" }}>
			<div className={styles.field}>
				<div className={styles.controls}>
					<IoIosArrowDown
						color='#dfdfdf'
						className={
							!isTodosShowed ? styles.showTodoBtn : styles.hideTodoBtn
						}
						cursor='pointer'
						onClick={() => onSetIsTodosShowed(prev => !prev)}
					/>
					<input
						className={styles.input}
						placeholder='What needs to be done?'
						onKeyUp={enterHandler}
						onChange={e => setTodo(e.target.value)}
						value={todo}
					/>
				</div>
				<IoMdSend
					className={styles.addButton}
					cursor='pointer'
					onClick={handleAddTodo}
					data-testid='addBtn'
				/>
			</div>
		</IconContext.Provider>
	);
};

export default TodoInput;
