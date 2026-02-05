import { Card, Badge, Button, ButtonGroup } from "react-bootstrap";
import "./guideCard.css";

export function GuideCard({ guide, isAdminMode, onEdit, onDelete }) {
  const { id, name, role, bio, yearsExperience, specialties, imageUrl } = guide;

  const getInitials = (fullName) => {
    const names = fullName.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  return (
    <Card className="guide-card">
      <Card.Body className="guide-card-body">
        <div className="guide-image-section">
          {imageUrl ? (
            <img src={imageUrl} alt={name} className="guide-image" />
          ) : (
            <div className="guide-placeholder">
              <span className="guide-initials">{getInitials(name)}</span>
            </div>
          )}
        </div>

        <div className="guide-info-section">
          <div className="guide-header">
            <div>
              <h3 className="guide-name">{name}</h3>
              <p className="guide-role">{role}</p>
            </div>
            <Badge bg="info" className="experience-badge">
              {yearsExperience} years experience
            </Badge>
          </div>

          <p className="guide-bio">{bio}</p>

          <div className="guide-specialties">
            <h4 className="specialties-title">Specialties:</h4>
            <div className="specialties-list">
              {specialties.map((specialty, index) => (
                <Badge key={index} bg="secondary" className="specialty-badge">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          {isAdminMode && (
            <div className="guide-admin-actions">
              <ButtonGroup>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => onEdit(id)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => onDelete(id)}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
