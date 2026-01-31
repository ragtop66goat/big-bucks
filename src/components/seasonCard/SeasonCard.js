import { Card, Badge, Button } from "react-bootstrap";
import { SeasonCalendar } from "../seasonCalendar/SeasonCalendar";
import { LicenseInfo } from "../licenseInfo/LicenseInfo";
import { RegulationsPanel } from "../regulationsPanel/RegulationsPanel";
import "./seasonCard.css";

export function SeasonCard({ season, isAdminMode, onEdit }) {
  const { id, name, species, dateRange, type, licenseInfo, bagLimits, regulations, image } = season;

  const typeBadgeText = type === "permit-only" ? "Permit Required" : "General Season";
  const typeBadgeVariant = type === "permit-only" ? "warning" : "success";

  return (
    <Card className="season-card">
      <Card.Header className="season-card-header">
        <div className="season-title-section">
          <h2 className="season-name">{name}</h2>
          <p className="season-species">{species}</p>
        </div>
        <Badge bg={typeBadgeVariant} className="season-type-badge">
          {typeBadgeText}
        </Badge>
      </Card.Header>

      <Card.Body className="season-card-body">
        <div className="season-content-grid">
          <div className="calendar-section">
            <SeasonCalendar dateRange={dateRange} seasonName={name} />
            {image && (
              <img
                src={image}
                alt={`${name}`}
                className="season-image"
              />
            )}
          </div>

          <div className="info-section">
            <LicenseInfo licenseInfo={licenseInfo} type={type} />
            <RegulationsPanel bagLimits={bagLimits} regulations={regulations} />
          </div>
        </div>
      </Card.Body>

      {isAdminMode && (
        <Card.Footer className="season-card-footer">
          <Button
            variant="outline-primary"
            onClick={() => onEdit(id)}
            className="edit-season-btn"
          >
            Edit Season
          </Button>
        </Card.Footer>
      )}
    </Card>
  );
}
