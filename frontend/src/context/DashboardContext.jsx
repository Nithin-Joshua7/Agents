import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";
import useAgentStore from "../store/useAgentstore";
import useTaskStore from "../store/useTaskStore";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const { addAgent, updateAgent, deleteAgent, getAgents } = useAgentStore();
  const { getTasksByAgent } = useTaskStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTasksModalOpen, setIsTasksModalOpen] = useState(false);
  const [editingAgentId, setEditingAgentId] = useState(null);
  const [agentToDelete, setAgentToDelete] = useState(null);
  const [agentForm, setAgentForm] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    mobile: "",
    password: "",
  });
  const [mobileError, setMobileError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgentForm((prev) => ({ ...prev, [name]: value }));
    if (name === "countryCode" || name === "mobile") {
      validateMobile(value, name === "countryCode" ? value : agentForm.countryCode);
    }
  };

  const handleMobileInput = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    const selectedCountry = [
      { code: "+91", length: 10 },
      { code: "+1", length: 10 },
      { code: "+44", length: 10 },
      { code: "+61", length: 9 },
    ].find((c) => c.code === agentForm.countryCode);
    const maxLength = selectedCountry ? selectedCountry.length : 10;
    if (value.length <= maxLength) {
      setAgentForm((prev) => ({ ...prev, mobile: value }));
      validateMobile(value, agentForm.countryCode);
    }
  };

  const validateMobile = (mobile, countryCode) => {
    const selectedCountry = [
      { code: "+91", length: 10 },
      { code: "+1", length: 10 },
      { code: "+44", length: 10 },
      { code: "+61", length: 9 },
    ].find((c) => c.code === countryCode);
    const expectedLength = selectedCountry ? selectedCountry.length : 10;
    if (!mobile) {
      setMobileError("Mobile number is required");
    } else if (mobile.length !== expectedLength) {
      setMobileError(`Mobile number must be ${expectedLength} digits for ${countryCode}`);
    } else {
      setMobileError("");
    }
  };

  const openAddModal = () => {
    setEditingAgentId(null);
    setAgentForm({ name: "", email: "", countryCode: "+91", mobile: "", password: "" });
    setMobileError("");
    setIsModalOpen(true);
    console.log("Add Agent modal opened");
  };

  const openEditModal = (agent) => {
    setEditingAgentId(agent._id);
    let countryCode = "+91";
    let mobile = agent.mobile;
    const foundCountry = [
      { code: "+91", length: 10 },
      { code: "+1", length: 10 },
      { code: "+44", length: 10 },
      { code: "+61", length: 9 },
    ].find((c) => agent.mobile.startsWith(c.code));
    if (foundCountry) {
      countryCode = foundCountry.code;
      mobile = agent.mobile.slice(foundCountry.code.length);
    }
    setAgentForm({ ...agent, countryCode, mobile, password: "" });
    validateMobile(mobile, countryCode);
    setIsModalOpen(true);
    console.log("Edit Agent modal opened for agent:", agent._id);
  };

  const handleSubmit = async () => {
    const fullMobile = `${agentForm.countryCode}${agentForm.mobile}`;
    if (!agentForm.name || !agentForm.email || !agentForm.mobile || (!editingAgentId && !agentForm.password)) {
      toast.error("All fields are required");
      console.log("Submit failed: Missing fields");
      return;
    }
    if (mobileError) {
      toast.error(mobileError);
      console.log("Submit failed: Mobile error:", mobileError);
      return;
    }

    try {
      if (editingAgentId) {
        await updateAgent(editingAgentId, {
          name: agentForm.name,
          email: agentForm.email,
          mobile: fullMobile,
        });
        toast.success("Agent updated successfully");
        console.log("Agent updated:", editingAgentId);
      } else {
        await addAgent({ ...agentForm, mobile: fullMobile });
        toast.success("Agent added successfully");
        console.log("Agent added:", agentForm);
      }
      setIsModalOpen(false);
      setEditingAgentId(null);
      await getAgents();
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to save agent";
      toast.error(errorMessage);
      console.error("Submit error:", errorMessage);
    }
  };

  const openDeleteModal = (id, name) => {
    setAgentToDelete({ id, name });
    setIsDeleteModalOpen(true);
    console.log("Delete modal opened for agent:", id);
  };

  const handleConfirmDelete = async () => {
    if (agentToDelete) {
      try {
        await deleteAgent(agentToDelete.id);
        toast.success("Agent deleted successfully");
        console.log("Agent deleted:", agentToDelete.id);
      } catch (err) {
        const errorMessage = err.response?.data?.message || "Failed to delete agent";
        toast.error(errorMessage);
        console.error("Delete error:", errorMessage);
      }
    }
    setIsDeleteModalOpen(false);
    setAgentToDelete(null);
  };

  const handleViewTasks = async (agentId) => {
    try {
      setIsTasksModalOpen(true);
      await getTasksByAgent(agentId);
      console.log("Tasks modal opened, fetching tasks for agent:", agentId);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to open tasks modal";
      toast.error(errorMessage);
      console.error("View tasks error:", errorMessage);
      setIsTasksModalOpen(false);
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        isTasksModalOpen,
        setIsTasksModalOpen,
        editingAgentId,
        agentForm,
        mobileError,
        agentToDelete,
        handleChange,
        handleMobileInput,
        handleSubmit,
        openAddModal,
        openEditModal,
        openDeleteModal,
        handleConfirmDelete,
        handleViewTasks,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

DashboardProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboardContext must be used within a DashboardProvider");
  }
  return context;
};

export default DashboardContext;