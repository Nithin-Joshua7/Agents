import { useDashboardContext } from "../context/DashboardContext";

// List of common country codes with expected mobile number lengths
const countryCodes = [
  { code: "+91", label: "+91 (India)", length: 10 },
  { code: "+1", label: "+1 (USA/Canada)", length: 10 },
  { code: "+44", label: "+44 (UK)", length: 10 },
  { code: "+61", label: "+61 (Australia)", length: 9 },
];

const AgentModal = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    agentForm,
    mobileError,
    editingAgentId,
    handleChange,
    handleMobileInput,
    handleSubmit,
  } = useDashboardContext();

  if (!isModalOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-md bg-gray-800/90 backdrop-blur-sm shadow-2xl border border-teal-700/30 text-white">
        <h2 className="text-2xl font-bold mb-6 text-cyan-300">
          {editingAgentId ? "Edit Agent" : "Add New Agent"}
        </h2>
        <div className="space-y-4">
          <label className="input input-bordered flex items-center gap-2 bg-gray-700/50 border-teal-600">
            <span className="text-sm font-medium text-cyan-300">Name</span>
            <input
              type="text"
              name="name"
              value={agentForm.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="grow bg-transparent text-white"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 bg-gray-700/50 border-teal-600">
            <span className="text-sm font-medium text-cyan-300">Email</span>
            <input
              type="email"
              name="email"
              value={agentForm.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="grow bg-transparent text-white"
            />
          </label>
          <div className="flex gap-3">
            <select
              name="countryCode"
              value={agentForm.countryCode}
              onChange={handleChange}
              className="select select-bordered w-1/3 bg-gray-700/50 border-teal-600 text-white"
            >
              {countryCodes.map((country) => (
                <option key={country.code} value={country.code} className="bg-gray-800">
                  {country.label}
                </option>
              ))}
            </select>
            <label
              className={`input input-bordered flex items-center gap-2 w-2/3 bg-gray-700/50 border-teal-600 ${
                mobileError ? "input-error border-red-600" : ""
              }`}
            >
              <span className="text-sm font-medium text-cyan-300">Mobile</span>
              <input
                type="text"
                name="mobile"
                value={agentForm.mobile}
                onChange={handleMobileInput}
                placeholder={`Enter ${
                  countryCodes.find((c) => c.code === agentForm.countryCode)?.length || 10
                }-digit mobile`}
                className="grow bg-transparent text-white"
              />
            </label>
          </div>
          {mobileError && <p className="text-red-400 text-sm">{mobileError}</p>}
          {!editingAgentId && (
            <label className="input input-bordered flex items-center gap-2 bg-gray-700/50 border-teal-600">
              <span className="text-sm font-medium text-cyan-300">Password</span>
              <input
                type="password"
                name="password"
                value={agentForm.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="grow bg-transparent text-white"
              />
            </label>
          )}
        </div>
        <div className="modal-action mt-6">
          <button
            className="btn btn-outline text-cyan-300 border-cyan-300 hover:bg-cyan-600 hover:border-cyan-600"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button className="btn bg-teal-600 hover:bg-teal-700 text-white" onClick={handleSubmit}>
            {editingAgentId ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentModal;