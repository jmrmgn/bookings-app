import React, { useState, useEffect } from 'react';
import { Grid, FormControl, InputLabel, NativeSelect } from '@mui/material';

import InputField from '../../components/InputField';
import { IBookingsFilters } from '../../interfaces';
import { useBookings } from '../../context/Context';
import { BookingService } from '../../services/bookings';

const Filters: React.FC = () => {
  const { filterBookings, filters } = useBookings();
  const [roomNames, setRoomNames] = useState<string[]>([]);
  const [stateFilters, setStateFilters] = useState<IBookingsFilters>(filters);

  useEffect(() => {
    getRoomNames();
  }, []);

  useEffect(() => {
    handleFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateFilters]);

  const getRoomNames = async (): Promise<void> => {
    const bookings = await BookingService.getBookings();
    const rawRoomNames = bookings.map(booking => booking.roomName);

    // Removing duplicates
    const _roomNames = rawRoomNames.filter(function (value, index, array) {
      return array.indexOf(value) === index;
    });

    setRoomNames(_roomNames);
  };

  // Overall Filters
  const handleFilters = async (): Promise<void> => {
    await filterBookings(stateFilters);
  };

  const handleChange = (e: any): void => {
    const name = e.target.name;
    const value = e.target.value;

    setStateFilters(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <Grid container style={{ marginBottom: 10 }} spacing={2}>
      <Grid item xs={12} md={3}>
        <InputField
          name='q'
          label='Search'
          value={stateFilters.q ?? ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <FormControl fullWidth>
          <InputLabel variant='standard' shrink>
            Meeting Room
          </InputLabel>
          <NativeSelect
            style={{ marginTop: 14 }}
            inputProps={{
              name: 'roomName',
              onChange: handleChange,
            }}
          >
            <option value=''>N/a</option>
            {roomNames.map(roomName => (
              <option key={roomName} value={roomName}>
                {roomName}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      </Grid>
      <Grid item xs={6} md={3}>
        <InputField
          name='from'
          type='date'
          label='From'
          value={stateFilters.from ?? ''}
          onChange={handleChange}
          fixedLabel
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <InputField
          name='to'
          type='date'
          label='To'
          value={stateFilters.to ?? ''}
          onChange={handleChange}
          fixedLabel
        />
      </Grid>
    </Grid>
  );
};

export default Filters;
