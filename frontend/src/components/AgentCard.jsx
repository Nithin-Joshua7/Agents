import PropTypes from "prop-types";
import { useDashboardContext } from "../context/DashboardContext";

const AgentCard = ({ agent }) => {
  const { openEditModal, openDeleteModal, handleViewTasks } = useDashboardContext();

  return (
    <div className="card bg-gray-700/50 backdrop-blur-sm shadow-lg border border-teal-700/30 p-4 hover:bg-teal-900/50 transition-colors">
      <div className="space-y-2">
        <div>
          <span className="font-semibold text-cyan-300">Name:</span> {agent.name}
        </div>
        <div>
          <span className="font-semibold text-cyan-300">Email:</span> {agent.email}
        </div>
        <div>
          <span className="font-semibold text-cyan-300">Mobile:</span> {agent.mobile}
        </div>
        <div className="flex justify-center gap-3 pt-2">
          <button
            className="btn btn-outline btn-sm text-cyan-300 border-cyan-300 hover:bg-cyan-600 hover:border-cyan-600"
            onClick={() => openEditModal(agent)}
          >
            Edit
          </button>
          <button
            className="btn btn-outline btn-sm text-cyan-300 border-cyan-300 hover:bg-cyan-600 hover:border-cyan-600"
            onClick={() => openDeleteModal(agent._id, agent.name)}
          >
            Delete
          </button>
          <button
            className="btn btn-outline btn-sm text-cyan-300 border-cyan-300 hover:bg-cyan-600 hover:border-cyan-600"
            onClick={() => handleViewTasks(agent._id)}
          >
            View Tasks
          </button>
        </div>
      </div>
    </div>
  );
};

AgentCard.propTypes = {
  agent: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
  }).isRequired,
};

export default AgentCard;