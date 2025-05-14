import PropTypes from "prop-types";
import { useDashboardContext } from "../context/DashboardContext";

const AgentTable = ({ agents, loading, error }) => {
  const { openEditModal, openDeleteModal, handleViewTasks } = useDashboardContext();

  return (
    <div className="hidden md:block">
        
      <table className="table w-full text-white">
        <thead>
          <tr className="bg-teal-800 text-white">
            <th className="text-center py-4 font-semibold text-lg">Name</th>
            <th className="text-center py-4 font-semibold text-lg">Email</th>
            <th className="text-center py-4 font-semibold text-lg">Mobile</th>
            <th className="text-center py-4 font-semibold text-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" className="text-center py-6 text-lg">
                <span className="loading loading-spinner text-cyan-400"></span> Loading...
              </td>
            </tr>
          ) : agents.length === 0 && !error ? (
            <tr>
              <td colSpan="4" className="text-center py-6 text-lg text-cyan-300">
                No agents found
              </td>
            </tr>
          ) : (
            agents.map((agent) => (
              <tr key={agent._id} className="hover:bg-teal-900/50 transition-colors">
                <td className="text-center align-middle py-4">{agent.name}</td>
                <td className="text-center align-middle py-4">{agent.email}</td>
                <td className="text-center align-middle py-4">{agent.mobile}</td>
                <td className="text-center align-middle py-4">
                  <div className="flex justify-center gap-3">
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
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

AgentTable.propTypes = {
  agents: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      mobile: PropTypes.string.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default AgentTable;