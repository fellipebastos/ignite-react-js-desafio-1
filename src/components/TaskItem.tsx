import { CheckCircle, Circle, Trash } from "phosphor-react";

import styles from "./TaskItem.module.css";

interface TaskItemProps {
  title: string;
  isDone: boolean;
  onDone: (title: string) => void;
  onDelete: (title: string) => void;
}

export function TaskItem({ title, isDone, onDone, onDelete }: TaskItemProps) {
  function handleDone() {
    onDone(title);
  }

  function handleDelete() {
    onDelete(title);
  }

  return (
    <li className={`${styles.taskItem} ${isDone && styles.taskItemDone}`}>
      <button className={styles.taskCheck} type="button" onClick={handleDone}>
        {isDone ? (
          <CheckCircle size={24} weight="fill" />
        ) : (
          <Circle size={24} />
        )}
      </button>

      <p>{title}</p>

      <button className={styles.taskDelete} type="button" onClick={handleDelete}>
        <Trash size={18} />
      </button>
    </li>
  );
}
