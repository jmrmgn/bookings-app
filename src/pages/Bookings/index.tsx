import React, { useState } from 'react';
import * as router from 'react-router';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from '@material-ui/core';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';

import { useBookings } from '../../context/Context';
import BookingEdit from './BookingEdit';
import Filters from './Filters';

const Bookings: React.FC = () => {
  const navigate = router.useNavigate();
  const [bookingId, setBookingId] = useState<number>();
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const { bookings, deleteBooking, getBooking } = useBookings();

  const handleClose = (): void => {
    setBookingId(undefined);
    setShowDelete(false);
  };

  // Handles delete of booking
  const handleDelete = async (): Promise<void> => {
    if (bookingId) {
      await deleteBooking(bookingId);
      setBookingId(undefined);
      setShowDelete(false);
    }
  };

  const handleOpenEdit = async (id: any): Promise<void> => {
    setBookingId(id);
    await getBooking(id);
    setShowEdit(true);
  };

  const handleCloseEdit = (): void => {
    setShowEdit(false);
    setBookingId(undefined);
  };

  // Check if the Booking Id exist
  const showEditDialog = !!bookingId && showEdit;

  const columns: GridColDef[] = [
    {
      field: 'roomName',
      headerName: 'Meeting Room',
      width: 200,
      disableColumnMenu: true,
    },
    {
      field: 'hostName',
      headerName: 'Host Name',
      width: 200,
      disableColumnMenu: true,
    },
    {
      field: 'guestsName',
      headerName: 'Guests Name',
      width: 200,
      disableColumnMenu: true,
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 120,
      disableColumnMenu: true,
    },
    {
      field: '',
      headerName: 'From-To',
      width: 120,
      disableColumnMenu: true,
      valueGetter: (params: GridValueGetterParams) => {
        return `${params.row?.from} - ${params.row?.to}`;
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true,
      renderCell: params => {
        return (
          <>
            <IconButton
              color='default'
              component='span'
              data-cy='edit'
              onClick={() => {
                navigate(`/booking/${params.row?.id}`);
              }}
            >
              <VisibilityIcon />
            </IconButton>
            <IconButton
              color='primary'
              component='span'
              data-cy='edit'
              onClick={() => handleOpenEdit(params.row?.id)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color='secondary'
              component='span'
              onClick={() => {
                setBookingId(params.row.id);
                setShowDelete(true);
              }}
              data-cy='delete'
            >
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <>
      {/* Delete Dialog */}
      <Dialog open={showDelete} onClose={handleClose}>
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
      {/* Filters */}
      <Filters />
      {/* Booking List */}
      <DataGrid
        rows={bookings}
        columns={columns}
        pageSize={bookings.length}
        hideFooter
        autoHeight
      />
    </>
  );
};

export default Bookings;
