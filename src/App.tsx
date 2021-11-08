import React from 'react';

import Bookings from './pages/Bookings';
import { Provider } from './context/Context';

function App() {
  return (
    <Provider>
      <Bookings />
    </Provider>
  );
}

export default App;
