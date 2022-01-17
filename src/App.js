import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components'
import { Dashboard } from './Pages'
import { Login, ResetPassword, User } from './Pages'

function App() {
  return (
    <div className='wrapper'>
      <Router>
        <Layout />
        <Routes>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/" element={<Login />} />
          <Route exact path="/reset-password" element={<ResetPassword />} />
          <Route exact path="/employee" element={<User />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
