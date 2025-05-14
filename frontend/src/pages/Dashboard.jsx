import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAgentStore from "../store/useAgentstore";
import useAuthStore from "../store/authStore";
import AgentTable from "../components/AgentTable";
import AgentCard from "../components/AgentCard";
import AgentModal from "../components/AgentModal";
import DeleteModal from "../components/DeleteModal";
import TasksModal from "../components/TasksModal";
import { DashboardProvider, useDashboardContext } from "../context/DashboardContext";
import UploadCSV from "../components/UploadCsv";

const DashboardContent = () => {
  const { agents, loading, error, getAgents } = useAgentStore();
  const { logout } = useAuthStore();
  const { openAddModal } = useDashboardContext();
  const navigate = useNavigate();

  useEffect(() => {
    getAgents();
  }, [getAgents]);

  const handleLogout = async () => {
    try {
      logout();
      navigate("/");
    } catch (err) {
      toast.error("Failed to log out");
    }
  };

  return (
    <>
      <div className="min-h-screen p-6 bg-gradient-to-b from-teal-900 to-blue-900 text-white" data-theme="dark">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-300">
            Ocean Agent Dashboard
          </h1>
          <div className="flex gap-4">
            <button className="btn btn-md bg-teal-600 hover:bg-teal-700 text-white" onClick={openAddModal}>
              Add Agent
            </button>
            <button
              className="btn btn-outline btn-md text-cyan-300 border-cyan-300 hover:bg-cyan-600 hover:border-cyan-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        {error && !loading && (
          <div className="alert alert-error mb-8 shadow-lg bg-red-600/50 border-red-700 text-white">
            <span>{error}</span>
          </div>
        )}

        <div className="card bg-gray-800/80 backdrop-blur-sm shadow-2xl border border-teal-700/30">
          <div className="card-body p-0 md:p-4">
            <AgentTable agents={agents} loading={loading} error={error} />
            <div className="block md:hidden space-y-4 p-4">
              {loading ? (
                <div className="text-center py-6 text-lg">
                  <span className="loading loading-spinner text-cyan-400"></span> Loading...
                </div>
              ) : agents.length === 0 && !error ? (
                <div className="text-center py-6 text-lg text-cyan-300">No agents found</div>
              ) : (
                agents.map((agent) => <AgentCard key={agent._id} agent={agent} />)
              )}
            </div>
          </div>
        </div>

        {/* ✅ Upload CSV section placed right after the agent table */}
        <div className="mt-8">
          <UploadCSV />
        </div>

        <AgentModal />
        <DeleteModal />
        <TasksModal />
      </div>
    </>
  );
};

const Dashboard = () => {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
};

export default Dashboard;
