import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { addField, addSection } from "../../utils/AppApi";

const AddItemForm = ({ setShowForm, getFields, sectionId }) => {
  const [formData, setFormData] = useState({
    newItemName: "",
    newItemValue: "",
  });
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [status, setstatus] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.newItemName.trim())
      newErrors.name = "Section name is required";
    if (!formData.newItemValue.trim()) newErrors.value = "Value is Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowForm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      const response = await addField(sectionId, formData);
      if (!response.success) {
        setstatus(response.error);
        setLoading(false);
      } else {
        getFields();
        setShowForm(false);
        setFormData({ sectionName: "", description: "", important: false });
        setLoading(false);
      }
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        height: 0,
      }}
      animate={{
        height: 290,
        opacity: 1,
      }}
      exit={{
        height: 0,
        opacity: 0,
        transition: {
          opacity: {
            duration: 0.2,
          },
        },
      }}
      ref={formRef}
      className="w-full z-100 overflow-hidden max-w-md mx-auto bg-base-200 p-6 rounded-xl shadow-xl absolute md:top-2/4 md:left-2/4 -translate-x-2/4 -translate-y-2/4 top-2/4 left-2/4"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Field</h2>
      <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
        {/* Section Name */}
        <div className="form-control">
          <input
            type="text"
            name="newItemName"
            placeholder="Name"
            className={`input input-bordered w-full ${
              errors.name ? "input-error" : ""
            }`}
            value={formData.newItemName}
            onChange={handleChange}
          />
          {errors.name && (
            <label className="label text-error text-sm">{errors.name}</label>
          )}
        </div>

        {/* Description */}
        <div className="form-control">
          <input
            type="text"
            name="newItemValue"
            placeholder="Value"
            className={`input input-bordered w-full ${
              errors.value ? "input-error" : ""
            }`}
            value={formData.newItemValue || ""}
            onChange={handleChange}
          />
          {errors.value && (
            <label className="label text-error text-sm">{errors.value}</label>
          )}
        </div>

        {/* Submit */}
        <button className="btn btn-primary w-full" type="submit">
          {loading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            "+ Add Field"
          )}
        </button>
      </form>
      <p className="text-center text-red-600 mt-3">{status}</p>
    </motion.div>
  );
};

export default AddItemForm;
