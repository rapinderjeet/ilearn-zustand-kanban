import { useMemo, useState } from 'react';
import { useStore } from '../store';
import './Column.css';
import Task from './Task';
import classNames from 'classnames';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';

export default function Column({ state }) {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [drop, setDropped] = useState(false);

  const tasks = useStore((state) => state.tasks);
  const draggedTask = useStore((state) => state.draggedTask);

  const addTask = useStore((state) => state.addTask);
  const setDraggedTask = useStore((state) => state.setDraggedTask);
  const moveTask = useStore((state) => state.moveTask);

  const tasksFiltered = useMemo(() => {
    return tasks.filter((task) => task.state === state);
  }, [tasks, state]);

  return (
    <div
      className={classNames('column', { drop: drop })}
      onDragOver={(e) => {
        e.preventDefault();
        setDropped(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDropped(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setDropped(false);
        moveTask(draggedTask, state);
        setDraggedTask(null);
      }}
    >
      <div className="titleWrapper">
        <p>{state}</p>
        <button onClick={() => setOpen(true)}>
          <AiOutlinePlus />
        </button>
      </div>
      {tasksFiltered.map((task) => (
        <Task key={task.uuid} uuid={task.uuid} />
      ))}
      {open && (
        <div className="modal">
          <div className="modalContent">
            <div className="closeBtnWrapper">
              <button
                onClick={() => {
                  setOpen(false);
                  setText('');
                }}
              >
                <AiOutlineClose />
              </button>
            </div>
            <div className='addTaskWrapper'>
              <label htmlFor="title">Title:</label>
              <textarea
                name="title"
                onChange={(e) => setText(e.target.value)}
                value={text}
                autoFocus
              />
              <button
                onClick={() => {
                  addTask(uuidv4(), text, state);
                  setText('');
                  setOpen(false);
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
