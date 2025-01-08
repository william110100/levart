import React, {useState, useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { generateQR } from '../../../../../actions/Report';

function QRImage(props) {
  const {open, openDialog} = props;
  const [image, setImage] = useState(null);
  const [id, setId] = useState();

  useEffect(() => {
    (async () => {
      if (open) {
        const {image, id} = await generateQR();
        setImage(image);
        setId(id);
      }
    })();
    return () => true;
  }, [open]);

  const handleRequestClose = () => {
    openDialog(false);
  };

  const regenerateImage = async () => {
    const {image, id} = await generateQR();
    setImage(image);
    setId(id);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Slide}
      onClose={handleRequestClose}
      fullWidth
      maxWidth="sm"
  >
      <DialogTitle>Generated QR</DialogTitle>
      <DialogContent>
        <form className="row" noValidate autoComplete="off">
          <div className="row col-12" style={{textAlign: 'center', display: 'block'}}>
            <img id="generated_qr" alt="generated qr" src={image} />
            <div>{id}</div>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={regenerateImage} color="primary">
          Regenerate
        </Button>
        <Button onClick={handleRequestClose} color="default">
          Close
        </Button>
      </DialogActions>
    </Dialog>

  );
}

export default QRImage;
