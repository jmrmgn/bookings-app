import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  IconButton,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';

import { useBookings } from '../../context/Context';

interface IDetails {
  name?: string;
  label?: string;
  value?: string;
}

const Details: React.FC<IDetails> = ({ name, label, value }) => {
  return (
    <>
      <Typography
        variant='h5'
        component='div'
        data-cy={`details-value-${name}`}
      >
        {value}
      </Typography>
      <Typography
        sx={{ mb: 1.5 }}
        color='text.secondary'
        data-cy={`details-label-${name}`}
      >
        {label}
      </Typography>
    </>
  );
};

Details.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
};

const BookingView: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { booking, getBooking } = useBookings();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async (): Promise<void> => {
    if (params?.id) {
      await getBooking(+params?.id);
    }
  };

  const timeFormat = 'LT';

  const fromTime = moment(`${booking.date} ${booking.from}`).format(timeFormat);
  const toTime = moment(`${booking.date} ${booking.to}`).format(timeFormat);
  const schedule = `${moment(booking.date).format(
    'dddd, MMMM Do YYYY'
  )} (${fromTime} - ${toTime})`;

  return (
    <Grid container>
      <Grid item xs={12}>
        <Card variant='outlined'>
          <CardHeader
            title={booking.roomName}
            subheader={schedule}
            avatar={
              <IconButton
                color='primary'
                component='span'
                data-cy='edit'
                onClick={() => navigate('/')}
              >
                <ArrowBackIcon />
              </IconButton>
            }
          />
          <CardActionArea>
            <CardMedia
              component='img'
              height='220'
              image='https://source.unsplash.com/random/'
            />
            <CardContent>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Details
                    name='hostName'
                    label='Host name'
                    value={booking.hostName}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Details
                    name='guestsName'
                    label='Guests name'
                    value={booking.guestsName}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
};

export default BookingView;
