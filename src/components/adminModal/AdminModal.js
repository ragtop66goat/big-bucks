import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setSeason } from "../../slice/SeasonsSlice";
import { SeasonForm } from "../seasonForm/SeasonForm";
import "./adminModal.css";

export function AdminModal({ show, seasonId, onHide }) {
  const dispatch = useDispatch();
  const season = useSelector((state) =>
    state.seasonsSlice.seasons.find((s) => s.id === seasonId),
  );

  const handleSave = (updatedSeason) => {
    dispatch(
      setSeason({
        id: seasonId,
        updates: updatedSeason,
      }),
    );
    onHide();
  };

  const handleCancel = () => {
    onHide();
  };

  if (!season) {
    return null;
  }

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Season</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SeasonForm
          season={season}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </Modal.Body>
    </Modal>
  );
}
