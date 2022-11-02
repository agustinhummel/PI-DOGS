import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './components/Home'
import landingPage from './components/Landing';
import Form from './components/Form';
import Details from './components/Detail';

function App() {
  return (
    <BrowserRouter>
      <Route exact path='/home' component={Home} />
      <Route exact path='/' component={landingPage} />
      <Route exact path='/create' component={Form} />
      <Route exact path='/dogs/:id' component={Details} />
    </BrowserRouter>
  );
}

export default App;
