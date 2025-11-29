import React, { useState } from "react";

export default function MoveEditorModal({ template, onSubmit, onClose }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    template.fields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }

      // Specific validations
      if (field.includes("Day")) {
        const day = parseInt(formData[field]);
        if (isNaN(day) || day < 1 || day > 30) {
          newErrors[field] = "Day must be between 1 and 30";
        }
      }

      if (field.includes("amount") || field.includes("Amount")) {
        const amount = parseFloat(formData[field]);
        if (isNaN(amount) || amount <= 0) {
          newErrors[field] = "Amount must be greater than 0";
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Convert fields to appropriate types
      const processedData = { type: template.id };
      template.fields.forEach((field) => {
        if (field.includes("Day")) {
          processedData[field] = parseInt(formData[field]);
        } else if (field.includes("amount") || field.includes("Amount")) {
          processedData[field] = parseFloat(formData[field]);
        } else {
          processedData[field] = formData[field];
        }
      });
      onSubmit(processedData);
    }
  };

  const getFieldLabel = (field) => {
    return field
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  const getFieldPlaceholder = (field) => {
    if (field.includes("Day")) return "1-30";
    if (field.includes("amount") || field.includes("Amount")) return "Enter amount";
    if (field === "category") return "e.g., Equipment, Utilities";
    if (field === "itemId") return "Document ID (optional)";
    return "";
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Configure Move: {template.label}</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-description">{template.description}</p>

          <form onSubmit={handleSubmit}>
            {template.fields.map((field) => (
              <div key={field} className="form-group">
                <label htmlFor={field}>{getFieldLabel(field)}</label>
                <input
                  type={field.includes("amount") || field.includes("Amount") || field.includes("Day") ? "number" : "text"}
                  id={field}
                  value={formData[field] || ""}
                  onChange={(e) => handleChange(field, e.target.value)}
                  placeholder={getFieldPlaceholder(field)}
                  className={errors[field] ? "input-error" : ""}
                />
                {errors[field] && <span className="error-text">{errors[field]}</span>}
              </div>
            ))}

            <div className="modal-actions">
              <button type="button" className="btn-cancel" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Create Move
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
