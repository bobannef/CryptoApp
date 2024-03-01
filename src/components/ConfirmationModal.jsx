import React from "react";
import { Modal, Button } from "react-bootstrap";

export const ConfirmationModal = ({ show, onClose, onConfirm }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Save</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to save this coin?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
