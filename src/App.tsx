import React, { useState, useRef } from "react";


interface Props {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [task, setTask] = useState<Props[]>([]);
  const taskInput = useRef<HTMLInputElement>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTask(newTask);
    setNewTask("");
    taskInput.current?.focus();
  };

  const addTask = (name: string):void => {
    if (name !== ''){
    const newTasks: Props[] = [...task, { name, done: false }];
    setTask(newTasks);
    }
    
  };

  const toggleDoneTask = (index:number):void => {
    const newTasks: Props[] = [...task];
    newTasks[index].done = !newTasks[index].done;
    setTask(newTasks);
  }

  const removeTask = (index: number):void => {
    const newTasks: Props[] = [...task];
    newTasks.splice(index,1);
    setTask(newTasks);
  }
  
  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  autoFocus
                  className="form-control"
                  type="text"
                  ref={taskInput}
                  onChange={(event) => setNewTask(event.target.value)}
                  value={newTask}
                />
                <button
                  className="btn btn-success btn-block mt-2"
                >Submit Task</button>
              </form>
            </div>
          </div>
          {task.map((t: Props, index: number) => (
            <div className="card card-body" key={index}>
              <span style={{textDecoration: t.done ? 'line-through' : '', fontSize: '1.2rem', fontWeight: 'bold', color: 'black'} } > {t.name} </span>
              <div>
                <button className="btn btn-primary" onClick={() => toggleDoneTask(index)} >
                  {t.done ? '✓' : '✗'}
                </button>
                <button className="btn btn-danger" onClick={() => removeTask(index)}>
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
