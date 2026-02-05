import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./aboutForms.css";

export function EthicsForm({ data, onSave, onCancel }) {
  const [formData, setFormData] = useState(data);
  const [newPrinciple, setNewPrinciple] = useState("");
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleAddPrinciple = () => {
    if (newPrinciple.trim() === "") return;

    setFormData((prev) => ({
      ...prev,
      principles: [...prev.principles, newPrinciple.trim()],
    }));
    setNewPrinciple("");
  };

  const handleDeletePrinciple = (index) => {
    setFormData((prev) => ({
      ...prev,
      principles: prev.principles.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || formData.title.trim() === "") {
      setError("Title is required");
      return;
    }

    onSave(formData);
  };

  return (
    <Form onSubmit={handleSubmit} className="about-form">
      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label htmlFor="title">Title</Form.Label>
        <Form.Control
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Enter section title"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="content">Content</Form.Label>
        <Form.Control
          id="content"
          as="textarea"
          rows={4}
          value={formData.content}
          onChange={(e) => handleChange("content", e.target.value)}
          placeholder="Enter section content"
        />
      </Form.Group>

      <div className="list-input-group">
        <Form.Label>Ethical Principles</Form.Label>
        <div className="list-items-container">
          {formData.principles.map((principle, index) => (
            <div key={index} className="list-item-row">
              <span className="list-item-text">{principle}</span>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleDeletePrinciple(index)}
                className="list-item-delete-btn"
              >
                Delete
              </Button>
            </div>
          ))}
          {formData.principles.length === 0 && (
            <p className="text-muted">No principles added yet.</p>
          )}
        </div>

        <div className="add-item-row">
          <Form.Control
            type="text"
            value={newPrinciple}
            onChange={(e) => setNewPrinciple(e.target.value)}
            placeholder="Add a principle"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddPrinciple();
              }
            }}
          />
          <Button variant="success" onClick={handleAddPrinciple}>
            Add
          </Button>
        </div>
      </div>

      <div className="form-actions">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </div>
    </Form>
  );
}
