import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./aboutForms.css";

export function ConservationForm({ data, onSave, onCancel }) {
  const [formData, setFormData] = useState(data);
  const [newPractice, setNewPractice] = useState("");
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleAddPractice = () => {
    if (newPractice.trim() === "") return;

    setFormData((prev) => ({
      ...prev,
      practices: [...prev.practices, newPractice.trim()],
    }));
    setNewPractice("");
  };

  const handleDeletePractice = (index) => {
    setFormData((prev) => ({
      ...prev,
      practices: prev.practices.filter((_, i) => i !== index),
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
        <Form.Label>Conservation Practices</Form.Label>
        <div className="list-items-container">
          {formData.practices.map((practice, index) => (
            <div key={index} className="list-item-row">
              <span className="list-item-text">{practice}</span>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleDeletePractice(index)}
                className="list-item-delete-btn"
              >
                Delete
              </Button>
            </div>
          ))}
          {formData.practices.length === 0 && (
            <p className="text-muted">No practices added yet.</p>
          )}
        </div>

        <div className="add-item-row">
          <Form.Control
            type="text"
            value={newPractice}
            onChange={(e) => setNewPractice(e.target.value)}
            placeholder="Add a practice"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddPractice();
              }
            }}
          />
          <Button variant="success" onClick={handleAddPractice}>
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
