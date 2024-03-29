import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Style
import './styles.css';

// Context
import { Provider } from './context/Context';

// Pages
import Bookings from './pages/Bookings';
import BookingView from './pages/Bookings/BookingView';

// dotenv config
require('dotenv').config();

function App() {
  return (
    <Provider>
      <Router>
        <Routes>
          <Route path='/' element={<Bookings />} />
          <Route path='/booking/:id' element={<BookingView />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
