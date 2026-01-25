import { Alert, Row, Col } from "react-bootstrap";
import { FaUsers, FaStar } from "react-icons/fa";
import "./discountInfo.css";

export function DiscountInfo({ discounts, promotions }) {
  return (
    <div className="discount-section">
      <h2 className="discount-heading">Group Discounts & Promotions</h2>
      <p className="discount-subtitle desc-1">
        Bring your friends and save on your hunting adventure
      </p>

      <Row className="discount-row">
        {discounts.map((discount, index) => (
          <Col key={index} xs={12} md={6}>
            <Alert variant="success" className="discount-alert">
              <div className="discount-icon">
                <FaUsers />
              </div>
              <div className="discount-badge">{discount.discount}% OFF</div>
              <h4 className="discount-group-size">{discount.groupSize}</h4>
              <p className="discount-description">{discount.description}</p>
            </Alert>
          </Col>
        ))}
      </Row>

      {promotions && promotions.length > 0 && (
        <>
          <h3 className="promotions-subheading">Special Promotions</h3>
          <Row className="discount-row">
            {promotions.map((promo, index) => (
              <Col key={index} xs={12} md={6}>
                <Alert variant="warning" className="promotion-alert">
                  <div className="discount-icon">
                    <FaStar />
                  </div>
                  <div className="discount-badge">{promo.discount}% OFF</div>
                  <h4 className="promotion-season">{promo.season}</h4>
                  <p className="promotion-deadline">{promo.deadline}</p>
                  <p className="discount-description">{promo.description}</p>
                </Alert>
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
}
