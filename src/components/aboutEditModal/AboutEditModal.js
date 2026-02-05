import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  setFamilyHistory,
  updateGuide,
  setConservation,
  setEthics,
} from "../../slice/AboutSlice";
import { FamilyHistoryForm } from "../aboutForms/FamilyHistoryForm";
import { GuideForm } from "../aboutForms/GuideForm";
import { ConservationForm } from "../aboutForms/ConservationForm";
import { EthicsForm } from "../aboutForms/EthicsForm";
import "./aboutEditModal.css";

export function AboutEditModal({ show, section, guideId, onHide }) {
  const dispatch = useDispatch();
  const { familyHistory, guides, conservation, ethics } = useSelector(
    (state) => state.aboutSlice
  );

  const handleSave = (data) => {
    switch (section) {
      case "familyHistory":
        dispatch(setFamilyHistory(data));
        break;
      case "guide":
        dispatch(updateGuide({ id: guideId, updates: data }));
        break;
      case "conservation":
        dispatch(setConservation(data));
        break;
      case "ethics":
        dispatch(setEthics(data));
        break;
      default:
        break;
    }
    onHide();
  };

  const getModalTitle = () => {
    switch (section) {
      case "familyHistory":
        return "Edit Family History";
      case "guide":
        return "Edit Guide";
      case "conservation":
        return "Edit Conservation";
      case "ethics":
        return "Edit Ethics";
      default:
        return "Edit";
    }
  };

  const renderForm = () => {
    switch (section) {
      case "familyHistory":
        return (
          <FamilyHistoryForm
            data={familyHistory}
            onSave={handleSave}
            onCancel={onHide}
          />
        );
      case "guide":
        const guide = guides.find((g) => g.id === guideId);
        if (!guide) return null;
        return <GuideForm data={guide} onSave={handleSave} onCancel={onHide} />;
      case "conservation":
        return (
          <ConservationForm
            data={conservation}
            onSave={handleSave}
            onCancel={onHide}
          />
        );
      case "ethics":
        return (
          <EthicsForm data={ethics} onSave={handleSave} onCancel={onHide} />
        );
      default:
        return null;
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{getModalTitle()}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{renderForm()}</Modal.Body>
    </Modal>
  );
}
