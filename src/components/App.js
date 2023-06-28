import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Header from './Header';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import Main from './Main';
import Footer from './Footer';
import InfoTooltip from './InfoTooltip';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from './ConfirmationPopup';
import ImagePopup from './ImagePopup';

import CurrentUserContext from '../contexts/CurrentUserContext';

import api from '../utils/api';
import * as auth from '../utils/auth';

export default function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegisterOk, setIsRegisterOk] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const navigate = useNavigate();

  function handleRegister(bool) {
    setIsInfoTooltipOpen(true);
    setIsRegisterOk(bool);
  }

  function handleLogin(email) {
    setEmail(email);
    setLoggedIn(true);
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setEmail('');
    setLoggedIn(false);
  }

  function handleTokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');

      auth
        .checkToken(jwt)
        .then(({ data }) => {
          handleLogin(data.email);
          navigate('/', { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    handleTokenCheck();
    if (loggedIn) {
      Promise.all([api.getUserData(), api.getInitialCards()])
        .then(([userData, initialCards]) => {
          setCurrentUser(userData);
          setCards(initialCards);
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleCardDeleteClick(card) {
    setSelectedCard(card);
    setIsConfirmationPopupOpen(true);
  }

  function closeAllPopups() {
    setIsInfoTooltipOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);

    api
      .changeLikeStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((oldCard) => (oldCard._id === card._id ? newCard : oldCard))
        );
      })
      .catch((err) => {
        alert(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) =>
          cards.filter((oldCard) => oldCard._id !== card._id)
        );
        closeAllPopups();
      })
      .catch((err) => {
        alert(err);
      });
  }

  function handleUpdateUser(formData) {
    setIsLoading(true);

    api
      .editUserData(formData)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(formData) {
    setIsLoading(true);

    api
      .editAvatar(formData)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(formData) {
    setIsLoading(true);

    api
      .addNewCard(formData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header email={email} onSignOut={handleSignOut} />
      <Routes>
        <Route
          path='/sign-up'
          element={<Register onRegister={handleRegister} />}
        />
        <Route
          path='/sign-in' 
          element={<Login onLogin={handleLogin} />}
        />
        <Route
          path='/'
          element={
            <ProtectedRoute
              element={Main}
              loggedIn={loggedIn}
              cards={cards}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDeleteClick={handleCardDeleteClick}
            />
          }
        />
        <Route
          path='*'
          element={loggedIn 
            ? (<Navigate to='/' replace />) 
            : (<Navigate to='/sign-in' replace />)
          }
        />
      </Routes>
      <Footer />
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        isRegisterOk={isRegisterOk}
        onClose={closeAllPopups}
      />
      {loggedIn && (
        <>
          <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            isLoading={isLoading}
          />
          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            isLoading={isLoading}
          />
          <AddPlacePopup
            onAddPlace={handleAddPlaceSubmit}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            isLoading={isLoading}
          />
          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />
          <ConfirmationPopup
            card={selectedCard}
            onCardDelete={handleCardDelete}
            isOpen={isConfirmationPopupOpen}
            onClose={closeAllPopups}
          />
        </>
      )}
    </CurrentUserContext.Provider>
  );
}
