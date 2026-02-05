import { useState } from "react";
import { Form, Button, Alert, Row, Col } from "react-bootstrap";
import "./aboutForms.css";

export function GuideForm({ data, onSave, onCancel }) {
  const [formData, setFormData] = useState(data);
  const [newSpecialty, setNewSpecialty] = useState("");
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleAddSpecialty = () => {
    if (newSpecialty.trim() === "") return;

    setFormData((prev) => ({
      ...prev,
      specialties: [...prev.specialties, newSpecialty.trim()],
    }));
    setNewSpecialty("");
  };

  const handleDeleteSpecialty = (index) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || formData.name.trim() === "") {
      setError("Name is required");
      return;
    }

    if (!formData.role || formData.role.trim() === "") {
      setError("Role is required");
      return;
    }

    onSave(formData);
  };

  return (
    <Form onSubmit={handleSubmit} className="about-form">
      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">Name</Form.Label>
            <Form.Control
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter guide name"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="role">Role</Form.Label>
            <Form.Control
              id="role"
              type="text"
              value={formData.role}
              onChange={(e) => handleChange("role", e.target.value)}
              placeholder="Enter guide role"
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="bio">Bio</Form.Label>
        <Form.Control
          id="bio"
          as="textarea"
          rows={3}
          value={formData.bio}
          onChange={(e) => handleChange("bio", e.target.value)}
          placeholder="Enter guide bio"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="yearsExperience">Years of Experience</Form.Label>
        <Form.Control
          id="yearsExperience"
          type="number"
          value={formData.yearsExperience}
          onChange={(e) =>
            handleChange("yearsExperience", parseInt(e.target.value) || 0)
          }
          min="0"
          max="99"
        />
      </Form.Group>

      <div className="list-input-group">
        <Form.Label>Specialties</Form.Label>
        <div className="list-items-container">
          {formData.specialties.map((specialty, index) => (
            <div key={index} className="list-item-row">
              <span className="list-item-text">{specialty}</span>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleDeleteSpecialty(index)}
                className="list-item-delete-btn"
              >
                Delete
              </Button>
            </div>
          ))}
          {formData.specialties.length === 0 && (
            <p className="text-muted">No specialties added yet.</p>
          )}
        </div>

        <div className="add-item-row">
          <Form.Control
            type="text"
            value={newSpecialty}
            onChange={(e) => setNewSpecialty(e.target.value)}
            placeholder="Add a specialty"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddSpecialty();
              }
            }}
          />
          <Button variant="success" onClick={handleAddSpecialty}>
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
