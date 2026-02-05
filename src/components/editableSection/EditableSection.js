import { Card, Button } from "react-bootstrap";
import "./editableSection.css";

export function EditableSection({
  section,
  isAdminMode,
  onEdit,
  className = "",
}) {
  const { title, content, listItems } = section;

  return (
    <Card className={`editable-section ${className}`}>
      <Card.Body>
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
          {isAdminMode && onEdit && (
            <Button variant="outline-primary" size="sm" onClick={onEdit}>
              Edit
            </Button>
          )}
        </div>

        <p className="section-content">{content}</p>

        {listItems && listItems.length > 0 && (
          <ul className="section-list">
            {listItems.map((item, index) => (
              <li key={index} className="section-list-item">
                {item}
              </li>
            ))}
          </ul>
        )}
      </Card.Body>
    </Card>
  );
}
