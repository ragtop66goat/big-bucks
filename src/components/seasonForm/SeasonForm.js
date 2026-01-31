import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./seasonForm.css";

export function SeasonForm({ season, onSave, onCancel }) {
  const [startDate, setStartDate] = useState(season.dateRange.start);
  const [endDate, setEndDate] = useState(season.dateRange.end);
  const [weekendsOnly, setWeekendsOnly] = useState(
    season.dateRange.weekendsOnly || false,
  );
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError("");

    // Validate date range
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      setValidationError("End date must be after start date");
      return;
    }

    // Prepare updated season data
    const updatedSeason = {
      ...season,
      dateRange: {
        start: startDate,
        end: endDate,
        ...(weekendsOnly && { weekendsOnly: true }),
      },
    };

    onSave(updatedSeason);
  };

  return (
    <Form onSubmit={handleSubmit} className="season-form">
      {validationError && (
        <Alert variant="danger" className="validation-error">
          {validationError}
        </Alert>
      )}

      <Form.Group className="mb-3">
        <Form.Label htmlFor="start-date">Start Date</Form.Label>
        <Form.Control
          type="date"
          id="start-date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="end-date">End Date</Form.Label>
        <Form.Control
          type="date"
          id="end-date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          id="weekends-only"
          label="Weekends Only"
          checked={weekendsOnly}
          onChange={(e) => setWeekendsOnly(e.target.checked)}
        />
      </Form.Group>

      <div className="form-actions">
        <Button variant="secondary" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </div>
    </Form>
  );
}
