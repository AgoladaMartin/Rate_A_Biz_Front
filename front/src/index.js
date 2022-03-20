import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { useLocalStorage } from './hooks/useLocalStorage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignUp, Login, Profile } from './pages';
import Search from './pages/Search';
<<<<<<< HEAD
import Review from './pages/Review';
=======
import { LoginModal } from './components/LoginModal/LoginModal';
>>>>>>> 28e62a1f3282db7ca3bb47cc36a691dcd64657e1

export const TokenContext = React.createContext();
const TokenProvider = (props) => {
  const [token, setToken] = useLocalStorage('token');
  return (
    <TokenContext.Provider value={[token, setToken]}>
      {props.children}
    </TokenContext.Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <TokenProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/signup' element={<SignUp />} />
          {/*  <Route path='/loginModal' element={<LoginModal />} /> */}
          <Route path='/search' element={<Search />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/review' element={<Review />} />
        </Routes>
      </BrowserRouter>
    </TokenProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
