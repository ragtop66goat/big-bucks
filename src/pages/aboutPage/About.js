import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Badge, Row, Col, Button } from "react-bootstrap";
import {
  toggleAdminMode,
  setEditingSection,
  clearEditingSection,
  deleteGuide,
} from "../../slice/AboutSlice";
import { EditableSection } from "../../components/editableSection/EditableSection";
import { GuideCard } from "../../components/guideCard/GuideCard";
import { AboutEditModal } from "../../components/aboutEditModal/AboutEditModal";
import "./about.css";

export function About() {
  const dispatch = useDispatch();
  const { familyHistory, guides, conservation, ethics, isAdminMode, editingSection } =
    useSelector((state) => state.aboutSlice);

  const [clickCount, setClickCount] = useState(0);
  const [clickTimeout, setClickTimeout] = useState(null);
  const [editingGuideId, setEditingGuideId] = useState(null);

  const handleTripleClick = () => {
    setClickCount((prev) => prev + 1);

    if (clickTimeout) {
      clearTimeout(clickTimeout);
    }

    const timeout = setTimeout(() => {
      if (clickCount + 1 >= 3) {
        dispatch(toggleAdminMode());
      }
      setClickCount(0);
    }, 500);

    setClickTimeout(timeout);
  };

  const handleEditSection = (section) => {
    dispatch(setEditingSection(section));
  };

  const handleEditGuide = (guideId) => {
    setEditingGuideId(guideId);
    dispatch(setEditingSection("guide"));
  };

  const handleDeleteGuide = (guideId) => {
    if (
      window.confirm("Are you sure you want to delete this guide? This action cannot be undone.")
    ) {
      dispatch(deleteGuide(guideId));
    }
  };

  const handleCloseModal = () => {
    dispatch(clearEditingSection());
    setEditingGuideId(null);
  };

  return (
    <>
      <div className="secondary-hero">
        <Container>
          <h1 onClick={handleTripleClick} style={{ cursor: "pointer" }}>
            <span>About Us</span>
            {isAdminMode && (
              <Badge bg="warning" className="ms-3">
                Admin Mode
              </Badge>
            )}
          </h1>
        </Container>
      </div>

      <Container className="about-page-content">
        <EditableSection
          section={familyHistory}
          isAdminMode={isAdminMode}
          onEdit={() => handleEditSection("familyHistory")}
          className="family-history-section"
        />

        <section className="guides-section">
          <div className="section-heading">
            <h2>Meet Our Guides</h2>
          </div>
          <Row>
            {guides.map((guide) => (
              <Col key={guide.id} md={12} lg={6} className="mb-4">
                <GuideCard
                  guide={guide}
                  isAdminMode={isAdminMode}
                  onEdit={handleEditGuide}
                  onDelete={handleDeleteGuide}
                />
              </Col>
            ))}
          </Row>
          {isAdminMode && (
            <div className="text-center mt-3">
              <Button
                variant="success"
                onClick={() => {
                  // In a real app, this would add a new guide
                  alert("Add new guide feature - would create a blank guide form");
                }}
              >
                Add New Guide
              </Button>
            </div>
          )}
        </section>

        <EditableSection
          section={{
            title: conservation.title,
            content: conservation.content,
            listItems: conservation.practices,
          }}
          isAdminMode={isAdminMode}
          onEdit={() => handleEditSection("conservation")}
          className="conservation-section"
        />

        <EditableSection
          section={{
            title: ethics.title,
            content: ethics.content,
            listItems: ethics.principles,
          }}
          isAdminMode={isAdminMode}
          onEdit={() => handleEditSection("ethics")}
          className="ethics-section"
        />
      </Container>

      <AboutEditModal
        show={editingSection !== null}
        section={editingSection}
        guideId={editingGuideId}
        onHide={handleCloseModal}
      />
    </>
  );
}
