import { FaTrophy, FaExclamationTriangle } from "react-icons/fa";
import { Alert } from "react-bootstrap";
import "./regulationsPanel.css";

export function RegulationsPanel({ bagLimits, regulations }) {
  const { general, antlerRestrictions, restrictions, notes } = bagLimits;

  return (
    <div className="regulations-panel">
      <div className="bag-limits-section">
        <h3 className="regulations-heading">
          <FaTrophy className="trophy-icon" />
          Bag Limits
        </h3>
        <div className="bag-limit-info">
          <p className="bag-limit-general">{general}</p>
          {(antlerRestrictions || restrictions) && (
            <p className="bag-limit-restrictions">
              <strong>Restrictions:</strong> {antlerRestrictions || restrictions}
            </p>
          )}
          {notes && notes.length > 0 && (
            <ul className="bag-limit-notes">
              {notes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="regulations-section">
        <h3 className="regulations-heading">Hunting Regulations</h3>
        <Alert variant="warning" className="regulations-alert">
          <ul className="regulations-list">
            {regulations.map((regulation, index) => (
              <li key={index}>
                <FaExclamationTriangle className="warning-icon" />
                <span>{regulation}</span>
              </li>
            ))}
          </ul>
        </Alert>
      </div>
    </div>
  );
}
