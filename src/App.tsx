import { FormEvent, useState } from "react";
import { PlusCircle } from "phosphor-react";

import { TaskItem } from "./components/TaskItem";

import todoLogo from "./assets/logo.svg";
import clipboardImg from "./assets/clipboard.png";

import styles from "./App.module.css";

interface TaskProps {
  title: string;
  isDone: boolean;
}

export function App() {
  const [newTaskText, setNewTaskText] = useState("");
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  /**
   * Handle the task input change.
   */
  function handleNewTaskChange(event: FormEvent<HTMLInputElement>) {
    setNewTaskText(event.currentTarget.value);
  }

  /**
   * Finish a task.
   */
  function handleDoneTask(title: string) {
    const newTasks = tasks.map((task) =>
      task.title === title ? { ...task, isDone: !task.isDone } : task
    );

    setTasks(newTasks);
  }

  /**
   * Create a new task.
   */
  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const newTask = {
      title: newTaskText,
      isDone: false,
    };

    setTasks((oldState) => [...oldState, newTask]);
    setNewTaskText("");
  }

  /**
   * Remove a task.
   */
  function deleteTask(title: string) {
    const newTasks = tasks.filter((task) => task.title !== title);

    setTasks(newTasks);
  }

  const finishedTasks = tasks.filter((task) => task.isDone).length;
  const totalTasks = tasks.length;

  return (
    <div>
      <header className={styles.header}>
        <img src={todoLogo} alt="ToDo logo" />
      </header>
      <main className={styles.wrapper}>
        <form className={styles.taskForm} onSubmit={handleCreateNewTask}>
          <input
            type="text"
            name="task"
            placeholder="Adicione uma nova tarefa"
            value={newTaskText}
            onChange={handleNewTaskChange}
            required
          />
          <button type="submit">
            Criar <PlusCircle size={20} />
          </button>
        </form>

        <div>
          <div className={styles.taskInfo}>
            <div className={styles.taskInfoCreated}>
              <p>Tarefas criadas</p>
              <span>{totalTasks}</span>
            </div>
            <div className={styles.taskInfoDone}>
              <p>Concluídas</p>
              <span>{`${finishedTasks} de ${totalTasks}`}</span>
            </div>
          </div>

          {totalTasks === 0 ? (
            <div className={styles.taskEmpty}>
              <img src={clipboardImg} alt="Ícone de lista vazia" />
              <p>Você ainda não tem tarefas cadastradas</p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          ) : (
            <ul className={styles.taskList}>
              {tasks.map((task) => (
                <TaskItem
                  key={task.title}
                  title={task.title}
                  isDone={task.isDone}
                  onDone={handleDoneTask}
                  onDelete={deleteTask}
                />
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
