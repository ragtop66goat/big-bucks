import { Card, Badge } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import "./packageCard.css";

export function PackageCard({ packageData, onSelect }) {
  const { id, name, tier, price, duration, groupSize, description, featured, included } = packageData;

  const formatPrice = (price) => {
    return `$${price.toLocaleString()}`;
  };

  const handleSelect = () => {
    onSelect(id);
  };

  return (
    <Card className={`package-card package-card-${tier}`} data-testid={`package-card-${id}`}>
      {featured && (
        <div className="featured-badge">
          <Badge bg="warning" text="dark">
            Most Popular
          </Badge>
        </div>
      )}
      <Card.Body>
        <Card.Title className="package-card-title">{name}</Card.Title>
        <div className="package-price">{formatPrice(price)}</div>
        <Card.Subtitle className="mb-3 text-muted package-details">
          <div>{duration}</div>
          <div>{groupSize}</div>
        </Card.Subtitle>
        <Card.Text className="package-description">{description}</Card.Text>

        <div className="package-included">
          <h6>What's Included:</h6>
          <ul className="included-list">
            {included.map((item, index) => (
              <li key={index}>
                <FaCheck className="check-icon" /> {item}
              </li>
            ))}
          </ul>
        </div>

        <button className="btn-styled package-select-btn" onClick={handleSelect}>
          Select Package
        </button>
      </Card.Body>
    </Card>
  );
}
