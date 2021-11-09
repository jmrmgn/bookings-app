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
  Grid,
} from '@mui/material';
import { Box } from '@mui/system';
import { Close as CloseIcon } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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

const Schema = Yup.object().shape({
  roomName: Yup.string().required('Required'),
  hostName: Yup.string().required('Required'),
  guestsName: Yup.string().required('Required'),
  date: Yup.string().required('Required'),
  from: Yup.string().required('Required'),
  to: Yup.string().required('Required'),
});

const BookingEdit: React.FC<Props> = ({ id, open = false, onClose }) => {
  const { booking, updateBooking } = useBookings();

  const formik = useFormik({
    initialValues: { ...booking },
    validationSchema: Schema,
    onSubmit: async (values, { setSubmitting }) => {
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
          <Grid container spacing={3} p={1}>
            <Grid item xs={12}>
              <InputField
                name='date'
                type='date'
                label='Date'
                value={values.date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.date}
                inputProps={{ min: Datetime.today() }}
                fixedLabel
              />
            </Grid>
            <Grid item xs={6}>
              <InputField
                name='from'
                type='time'
                label='From'
                value={values.from}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.from}
                fixedLabel
              />
            </Grid>
            <Grid item xs={6}>
              <InputField
                name='to'
                type='time'
                label='To'
                value={values.to}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.to}
                fixedLabel
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name='roomName'
                label='Room Name'
                value={values.roomName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.roomName}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name='hostName'
                label='Host Name'
                value={values.hostName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.hostName}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name='guestsName'
                label='Guests Name'
                value={values.guestsName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
