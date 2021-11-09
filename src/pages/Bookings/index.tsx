import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

import { useBookings } from '../../context/Context';
import { IBookings } from '../../interfaces';
import BookingEdit from './BookingEdit';

export default function Bookings() {
  const [bookingId, setBookingId] = useState<number | undefined>(2); // todo: remove undefineds
  const [showEdit, setShowEdit] = useState(true);
  const { bookings, deleteBooking } = useBookings();

  const handleClose = (): void => setBookingId(undefined);

  // Handles delete of booking
  const handleDelete = async (): Promise<void> => {
    if (bookingId) {
      await deleteBooking(bookingId);
      setBookingId(undefined);
    }
  };

  const handleCloseEdit = (): void => {
    setShowEdit(false);
    setBookingId(undefined);
  };

  // Check if the Booking Id exist
  const showDeleteDialog = !!bookingId && !showEdit && false; // todo: remove false
  const showEditDialog = !!bookingId && showEdit;

  return (
    <>
      <Dialog open={showDeleteDialog} onClose={handleClose}>
        <DialogTitle>Are you sure you want to delete?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} data-cy='cancel-delete'>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color='primary'
            data-cy='confirm-delete'
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      {showEditDialog && (
        <BookingEdit id={bookingId} open={showEdit} onClose={handleCloseEdit} />
      )}
      <TableContainer component={Paper} data-cy='bookings-list'>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Room Name</TableCell>
              <TableCell>Host Name</TableCell>
              <TableCell>Guests Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>From-To</TableCell>
              <TableCell align='center'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((row: IBookings) => {
              const deleteStyle = {
                backgroundColor: '#d9534f',
              };

              return (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  style={
                    row.id === bookingId && showDeleteDialog ? deleteStyle : {}
                  }
                >
                  <TableCell>{row.roomName}</TableCell>
                  <TableCell>{row.hostName}</TableCell>
                  <TableCell>{row.guestsName}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.fromTo}</TableCell>
                  <TableCell align='center'>
                    <IconButton
                      color='primary'
                      component='span'
                      data-cy='edit'
                      onClick={() => {
                        setBookingId(row.id);
                        setShowEdit(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color='error'
                      component='span'
                      onClick={() => setBookingId(row.id)}
                      data-cy='delete'
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
