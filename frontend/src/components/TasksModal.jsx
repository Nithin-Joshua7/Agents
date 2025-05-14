import { useDashboardContext } from "../context/DashboardContext";
import useTaskStore from "../store/useTaskStore";

const TasksModal = () => {
  const { isTasksModalOpen, setIsTasksModalOpen } = useDashboardContext();
  const { tasks, loading: tasksLoading, error: tasksError } = useTaskStore();

  if (!isTasksModalOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-3xl bg-gray-800/90 backdrop-blur-sm shadow-2xl border border-teal-700/30 text-white">
        <h2 className="text-2xl font-bold mb-6 text-cyan-300">Agent Tasks</h2>
        {tasksLoading ? (
          <div className="text-center py-6 text-lg">
            <span className="loading loading-spinner text-cyan-400"></span> Loading tasks...
          </div>
        ) : tasksError ? (
          <div className="alert alert-error mb-6 shadow-lg bg-red-600/50 border-red-700 text-white">
            <span>{tasksError}</span>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-6 text-lg text-cyan-300">
            No tasks found for this agent
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full text-white">
              <thead>
                <tr className="bg-teal-800 text-white">
                  <th className="text-center py-4 font-semibold text-lg">First Name</th>
                  <th className="text-center py-4 font-semibold text-lg">Phone</th>
                  <th className="text-center py-4 font-semibold text-lg">Notes</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task._id} className="hover:bg-teal-900/50 transition-colors">
                    <td className="text-center align-middle py-4">{task.firstName}</td>
                    <td className="text-center align-middle py-4">{task.phone}</td>
                    <td className="text-center align-middle py-4">{task.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="modal-action mt-6">
          <button
            className="btn btn-outline text-cyan-300 border-cyan-300 hover:bg-cyan-600 hover:border-cyan-600"
            onClick={() => setIsTasksModalOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TasksModal;