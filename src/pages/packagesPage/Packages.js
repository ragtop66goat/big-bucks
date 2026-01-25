import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { PackageCard } from "../../components/packageCard/PackageCard";
import { AddOnsList } from "../../components/addOnsList/AddOnsList";
import { DiscountInfo } from "../../components/discountInfo/DiscountInfo";
import { setSelectedPackage } from "../../slice/PackageSlice";
import "./packages.css";

export function Packages() {
  const dispatch = useDispatch();
  const packages = useSelector((state) => state.packageSlice.packages);
  const addOns = useSelector((state) => state.packageSlice.addOns);
  const groupDiscounts = useSelector(
    (state) => state.packageSlice.groupDiscounts
  );
  const seasonalPromotions = useSelector(
    (state) => state.packageSlice.seasonalPromotions
  );

  const handleSelectPackage = (packageId) => {
    dispatch(setSelectedPackage(packageId));
  };

  return (
    <>
      <div className="secondary-hero">
        <div className="container">
          <h1>
            <span>Packages</span>
          </h1>
        </div>
      </div>

      <Container>
        <div className="packages-intro">
          <p className="desc-1" data-testid="intro-text">
            Choose the perfect hunting package for your next Montana adventure.
            Whether you're planning a quick weekend escape or an extended
            expedition, we have options for every hunter and every budget.
          </p>
        </div>

        <Row className="packages-grid">
          {packages.map((pkg) => (
            <Col key={pkg.id} xs={12} md={6} lg={6}>
              <PackageCard packageData={pkg} onSelect={handleSelectPackage} />
            </Col>
          ))}
        </Row>

        <AddOnsList addOns={addOns} />

        <DiscountInfo
          discounts={groupDiscounts}
          promotions={seasonalPromotions}
        />

        <div className="contact-cta">
          <p className="desc-1">
            Ready to book your hunt?{" "}
            <a href="/contact" className="cta-link">
              Contact us today
            </a>{" "}
            to reserve your dates!
          </p>
        </div>
      </Container>
    </>
  );
}
