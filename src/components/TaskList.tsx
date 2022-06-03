import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState(''); /*Como ele já está vazio, se eu colocar diferente de !=='' vai se verdadeiro*/

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    
    if(!newTaskTitle)return;

    /*Criar uma nova task*/
    const tasks ={
      id: Math.random(), /*Math.random gera um ID aleatório */
      title: newTaskTitle, /*newTaskTitle por que ele já está sendo setado no html e na interface o tipo string(text no-->html) */
      isComplete: false
    }

    setTasks(antigoState => [...antigoState, tasks]);
    setNewTaskTitle('');/*Após inserir a nova task reseta/limpa o imput para inserir uma nova */

  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const currentTasks = tasks.map(tasks => tasks.id === id ? {
      ...tasks, /*spred da task ou seja pegas todos os valores antigos dela  */
      isComplete: !tasks.isComplete
    } : tasks);

    setTasks(currentTasks) 
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
     const filteredTasks = tasks.filter(tasks => tasks.id !== id);
     setTasks(filteredTasks)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas Tarefas</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}