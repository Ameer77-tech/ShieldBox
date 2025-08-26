import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { addSection } from "../../utils/AppApi";

const AddSectionForm = ({ setShowForm, getSections, showForm }) => {
  const [formData, setFormData] = useState({
    sectionName: "",
    description: "",
    important: false,
  });
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [status, setstatus] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.sectionName.trim())
      newErrors.name = "Section name is required";
    if (formData.description.length > 100)
      newErrors.description = "Max 100 characters allowed";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      const response = await addSection(formData);
      const error = response.error;
      if (response.success) {
        getSections();
        setShowForm(false);
        setFormData({ sectionName: "", description: "", important: false });
      } else {
        setstatus(error);
        setLoading(false);
      }
    }
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
      <motion.div
        initial={{
          opacity: 0,
          height: 0,
        }}
        animate={{
          height: 400,
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
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Section</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Section Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Section Name</span>
            </label>
            <input
              type="text"
              name="sectionName"
              placeholder="e.g. Passwords"
              className={`input input-bordered ${
                errors.name ? "input-error" : ""
              }`}
              value={formData.sectionName}
              onChange={handleChange}
            />
            {errors.name && (
              <label className="label text-error text-sm">{errors.name}</label>
            )}
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description (optional)</span>
            </label>
            <textarea
              name="description"
              className={`textarea textarea-bordered resize-none ${
                errors.description ? "textarea-error" : ""
              }`}
              rows="3"
              cols="3"
              placeholder="Short description..."
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <label className="label text-error text-sm">
                {errors.description}
              </label>
            )}
          </div>

          {/* Important Toggle */}
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text">Mark as Important</span>
              <input
                type="checkbox"
                name="important"
                className="toggle toggle-primary"
                checked={formData.important}
                onChange={handleChange}
              />
            </label>
          </div>

          {/* Submit */}
          <button className="btn btn-primary w-full" type="submit">
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "+ Add Section"
            )}
          </button>
        </form>
        <p className="text-center text-red-600 mt-3">{status}</p>
      </motion.div>
    </div>
  );
};

export default AddSectionForm;
