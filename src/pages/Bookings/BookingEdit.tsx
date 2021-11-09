import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import {
  Button,
  // Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Grid,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useBookings } from '../../context/Context';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

interface Props {
  id: number;
  open: boolean;
  onClose: () => void;
}

/*
  Date | From-To
  Meeting Room
  Host name
  Guests name
*/

const BookingEdit: React.FC<Props> = ({ id, open = false, onClose }) => {
  const { getBooking, booking } = useBookings();
  const handleSave = () => {};

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async (): Promise<void> => {
    await getBooking(id);
  };

  return (
    <BootstrapDialog onClose={onClose} open={open}>
      <BootstrapDialogTitle id='customized-dialog-title' onClose={onClose}>
        Edit Booking
      </BootstrapDialogTitle>
      <DialogContent dividers>
        {/* <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </Typography> */}
        <Grid container spacing={2} p={2}>
          <Grid item xs={6}>
            <FormControl variant='standard' fullWidth>
              <InputLabel>Date</InputLabel>
              <Input value={booking.date} onChange={() => {}} />
              {/* <FormHelperText id='component-error-text'>Error</FormHelperText> */}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant='standard' fullWidth>
              <InputLabel>From - To</InputLabel>
              <Input value={booking.fromTo} onChange={() => {}} />
              {/* <FormHelperText id='component-error-text'>Error</FormHelperText> */}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant='standard' fullWidth>
              <InputLabel>Room Name</InputLabel>
              <Input value={booking.roomName} onChange={() => {}} />
              {/* <FormHelperText id='component-error-text'>Error</FormHelperText> */}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant='standard' fullWidth>
              <InputLabel>Host Name</InputLabel>
              <Input value={booking.hostName} onChange={() => {}} />
              {/* <FormHelperText id='component-error-text'>Error</FormHelperText> */}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant='standard' fullWidth>
              <InputLabel>Guests Name</InputLabel>
              <Input value={booking.guestsName} onChange={() => {}} />
              {/* <FormHelperText id='component-error-text'>Error</FormHelperText> */}
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='inherit'>
          Cancel
        </Button>
        <Button onClick={handleSave} color='primary'>
          Save
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

BookingEdit.propTypes = {
  id: PropTypes.number.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BookingEdit;
