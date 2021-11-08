import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

import { IBookings } from '../../api/interface';
import { getBookings } from '../../api/controllers/bookings';

export default function Bookings() {
  const [data, setData] = useState<IBookings[]>([]);

  useEffect(() => {
    init();
  }, []);

  const init = async (): Promise<void> => {
    const bookings = await getBookings();
    setData(bookings);
  };

  return (
    <TableContainer component={Paper}>
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
          {data.map((row: IBookings) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{row.roomName}</TableCell>
              <TableCell>{row.hostName}</TableCell>
              <TableCell>{row.guestsName}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.fromTo}</TableCell>
              <TableCell align='center'>
                <IconButton color='primary' component='span'>
                  <EditIcon />
                </IconButton>
                <IconButton color='error' component='span'>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
