import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./aboutForms.css";

export function FamilyHistoryForm({ data, onSave, onCancel }) {
  const [formData, setFormData] = useState(data);
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
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
          rows={6}
          value={formData.content}
          onChange={(e) => handleChange("content", e.target.value)}
          placeholder="Enter section content"
        />
      </Form.Group>

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
