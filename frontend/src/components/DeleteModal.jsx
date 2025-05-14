import { useDashboardContext } from "../context/DashboardContext";

const DeleteModal = () => {
  const { isDeleteModalOpen, setIsDeleteModalOpen, agentToDelete, handleConfirmDelete } =
    useDashboardContext();

  if (!isDeleteModalOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-sm bg-gray-800/90 backdrop-blur-sm shadow-2xl border border-teal-700/30 text-white">
        <h2 className="text-xl font-bold mb-4 text-cyan-300">Confirm Deletion</h2>
        <p className="text-base mb-6">
          Are you sure you want to delete agent{" "}
          <span className="font-semibold text-cyan-400">"{agentToDelete?.name}"</span>?
        </p>
        <div className="modal-action">
          <button
            className="btn btn-outline text-cyan-300 border-cyan-300 hover:bg-cyan-600 hover:border-cyan-600"
            onClick={() => {
              setIsDeleteModalOpen(false);
              setAgentToDelete(null);
            }}
          >
            Cancel
          </button>
          <button
            className="btn bg-teal-600 hover:bg-teal-700 text-white"
            onClick={handleConfirmDelete}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;