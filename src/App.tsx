import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Context
import { Provider } from './context/Context';

// Pages
import Bookings from './pages/Bookings';
import BookingView from './pages/Bookings/BookingView';

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
