import React, { useRef } from 'react';
import useUploadStore from '../store/useUploadStore';
import { toast } from 'react-hot-toast';

const UploadCSV = () => {
  const inputRef = useRef();
  const { uploadCSV, loading, resetStatus } = useUploadStore();

  const handleFileChange = async (e) => {
    resetStatus();
    const file = e.target.files[0];
    if (!file) return;

    // Validate file extension
    if (!/\.(csv|xlsx|xls)$/i.test(file.name)) {
      toast.error('❌ Only CSV, XLSX, or XLS files allowed');
      inputRef.current.value = '';
      return;
    }

    // Perform upload
    try {
      await uploadCSV(file);
      toast.success('✅ Tasks uploaded and distributed');
      inputRef.current.value = '';
    } catch (err) {
      toast.error(err.message || '❌ Upload failed');
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md border border-teal-600 text-white max-w-md mx-auto">
      <label className="block mb-2 font-semibold text-teal-300">Upload Task CSV</label>
      <input
        ref={inputRef}
        type="file"
        accept=".csv,.xlsx,.xls"
        className="file-input file-input-bordered file-input-sm w-full"
        onChange={handleFileChange}
        disabled={loading}
      />
      {loading && <p className="text-cyan-300 mt-2">Uploading...</p>}
    </div>
  );
};

export default UploadCSV;
