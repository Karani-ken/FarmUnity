import React from 'react';
import {Modal,Rating,Box,Button} from '@mui/material';

const RatingModal = ({ open, onClose, onSubmit }) => {
  const [value, setValue] = React.useState(0);

  const handleRatingChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = () => {
    onSubmit(value);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
        <h2 id="simple-modal-title">Rate Service</h2>
        <Box component="fieldset" borderColor="transparent">
          <Rating
            name="rating"
            value={value}
            onChange={handleRatingChange}
          />
        </Box>
        <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
      </div>
    </Modal>
  );
};

export default RatingModal;
