import { Dispatch, FC, SetStateAction } from "react";

import styles from "./BottomBar.module.css";
import { Filter } from "../../types/todos";

interface BottomBarProps {
	todosLeft: number;
	filter: Filter;
	onClearCompleted: () => void;
	onSetFilter: Dispatch<SetStateAction<Filter>>;
}

const BottomBar: FC<BottomBarProps> = ({
	todosLeft,
	filter,
	onClearCompleted,
	onSetFilter,
}) => {
	return (
		<div className={styles.bottomBar}>
			<div>{todosLeft} items left</div>
			<ul className={styles.todosSwitcher}>
				<li
					className={filter === "all" ? styles.active : ""}
					onClick={() => onSetFilter("all")}
				>
					All
				</li>
				<li
					className={filter === "active" ? styles.active : ""}
					onClick={() => onSetFilter("active")}
				>
					Active
				</li>
				<li
					className={filter === "completed" ? styles.active : ""}
					onClick={() => onSetFilter("completed")}
				>
					Completed
				</li>
			</ul>
			<div
				className={styles.todosClear}
				onClick={onClearCompleted}
			>
				Clear completed
			</div>
		</div>
	);
};

export default BottomBar;
