import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Badge } from "react-bootstrap";
import { toggleAdminMode } from "../../slice/SeasonsSlice";
import { SeasonCard } from "../../components/seasonCard/SeasonCard";
import { AdminModal } from "../../components/adminModal/AdminModal";
import "./seasons.css";

export function Seasons() {
  const dispatch = useDispatch();
  const { seasons, isAdminMode } = useSelector((state) => state.seasonsSlice);
  const [editingSeasonId, setEditingSeasonId] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [clickTimeout, setClickTimeout] = useState(null);

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

  const handleEditSeason = (seasonId) => {
    setEditingSeasonId(seasonId);
  };

  const handleCloseModal = () => {
    setEditingSeasonId(null);
  };

  return (
    <>
      <div className="secondary-hero">
        <Container>
          <h1 onClick={handleTripleClick} style={{ cursor: "pointer" }}>
            <span>Hunting Seasons</span>
            {isAdminMode && (
              <Badge bg="warning" className="ms-3">
                Admin Mode
              </Badge>
            )}
          </h1>
        </Container>
      </div>

      <Container className="seasons-page-content">
        <div className="intro-text">
          <p className="desc-1">
            Plan your hunting adventure with our detailed season calendars.
            View license requirements, bag limits, and regulations for each
            season.
          </p>
        </div>

        <div className="seasons-list">
          {seasons.map((season) => (
            <SeasonCard
              key={season.id}
              season={season}
              isAdminMode={isAdminMode}
              onEdit={handleEditSeason}
            />
          ))}
        </div>
      </Container>

      <AdminModal
        show={editingSeasonId !== null}
        seasonId={editingSeasonId}
        onHide={handleCloseModal}
      />
    </>
  );
}
