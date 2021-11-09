import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  FormControl,
  InputLabel,
  Input,
  Grid,
} from '@mui/material';
import { Box } from '@mui/system';
import { Close as CloseIcon } from '@mui/icons-material';
import { useFormik } from 'formik';

import { useBookings } from '../../context/Context';
import { IBookings } from '../../interfaces';
import InputField from '../../components/InputField';
import * as Datetime from '../../helpers/datetime';

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

const BookingEdit: React.FC<Props> = ({ id, open = false, onClose }) => {
  const { booking, updateBooking } = useBookings();

  const formik = useFormik({
    initialValues: { ...booking },
    validateOnChange: false,
    // validationSchema: Schema,
    onSubmit: async (values, { setFieldError, setSubmitting, resetForm }) => {
      setSubmitting(true);
      await handleUpdate(values);
      setSubmitting(false);
    },
  });

  const handleUpdate = async (values: IBookings): Promise<void> => {
    await updateBooking(values);
    onClose();
  };

  const values: IBookings = formik.values;

  return (
    <BootstrapDialog onClose={onClose} open={open}>
      <Box component='form' onSubmit={formik.handleSubmit}>
        <BootstrapDialogTitle id='customized-dialog-title' onClose={onClose}>
          Edit Booking
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} p={2}>
            <Grid item xs={6}>
              <InputField
                type='date'
                label='Date'
                value={values.date}
                onChange={formik.handleChange('date')}
                error={formik.errors.date}
                inputProps={{ min: Datetime.today() }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl variant='standard' fullWidth>
                <InputLabel>From - To</InputLabel>
                <Input
                  value={values.fromTo}
                  onChange={formik.handleChange('fromTo')}
                />
                {/* <FormHelperText id='component-error-text'>Error</FormHelperText> */}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <InputField
                label='Room Name'
                value={values.roomName}
                onChange={formik.handleChange('roomName')}
                error={formik.errors.roomName}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                label='Host Name'
                value={values.hostName}
                onChange={formik.handleChange('hostName')}
                error={formik.errors.hostName}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                label='Guests Name'
                value={values.guestsName}
                onChange={formik.handleChange('guestsName')}
                error={formik.errors.guestsName}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color='inherit'>
            Cancel
          </Button>
          <Button type='submit' color='primary'>
            Save
          </Button>
        </DialogActions>
      </Box>
    </BootstrapDialog>
  );
};

BookingEdit.propTypes = {
  id: PropTypes.number.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BookingEdit;
