import classNames from 'classnames';
import './Task.css';
import { useStore } from '../store';
import { AiOutlineDelete } from 'react-icons/ai';

export default function Task({ uuid }) {
  const task = useStore((state) =>
    state.tasks.find((task) => task.uuid === uuid)
  );
 
  const deleteTask = useStore((state) => state.deleteTask);
  const setDraggedTask = useStore((state) => state.setDraggedTask);

  return (
    <div
      className="task"
      draggable
      onDragStart={() => setDraggedTask(task.uuid)}
    >
      <div>{task.title}</div>
      <div className="bottomWrapper">
        <div className="trashWrapper" onClick={() => deleteTask(task.uuid)}>
          <AiOutlineDelete className="trashIcon" />
        </div>
        <div className={classNames('status', task.state)}>{task.state}</div>
      </div>
    </div>
  );
}
