import { Card, Row, Col } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import "./addOnsList.css";

export function AddOnsList({ addOns }) {
  const formatPrice = (price, unit) => {
    return `$${price} ${unit}`;
  };

  if (addOns.length === 0) {
    return (
      <div className="addons-section">
        <h2 className="addons-heading">Add-On Services</h2>
        <p className="text-center">No add-on services available at this time.</p>
      </div>
    );
  }

  return (
    <div className="addons-section">
      <h2 className="addons-heading">Add-On Services</h2>
      <p className="addons-subtitle desc-1">
        Customize your hunt with these optional services
      </p>
      <Row>
        {addOns.map((addOn) => (
          <Col key={addOn.id} xs={12} md={6} lg={4}>
            <Card className="addon-card">
              <Card.Body>
                <div className="addon-icon">
                  <FaPlus />
                </div>
                <Card.Title className="addon-title">{addOn.name}</Card.Title>
                <div className="addon-price">
                  {formatPrice(addOn.price, addOn.unit)}
                </div>
                <Card.Text className="addon-description">
                  {addOn.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
