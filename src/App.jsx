import { useEffect, useReducer, useState } from 'react'
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import ArtworkIntro from './pages/ArtworkIntro';
import Login from './pages/Login/Login';
import Register from './pages/Login/Register';
import { fetchAllowPost, fetchArtworkIntro, fetchCategory, fetchGetAll, fetchLogin, fetchLogout, fetchRegister, fetchSession } from './services';
import Loading from './components/Loading/Loading.jsx';
import Bar from './components/Bar/Bar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Error from './components/Error/Error.jsx';
import Post from './pages/Post.jsx';
import Manage from './pages/Manage.jsx';

function App() {
  const initialLoginState = {
    isLoggedIn: false,
    username: 'null',
    role: 'null',
    liked: [],
  };
  const initPageState = {
    currentPage: 'home',
    artwork: null,
    needBar: true,
    needFooter: true,
  };

  function pageReducer(state, action) {
    switch (action.type) {
      case 'home':
      case 'gallery':
      case 'post':
      case 'manage':
        return {
          currentPage: action.type,
          needBar: true,
          needFooter: true,
        };
      case 'login':
      case 'register':
      case 'loading':
        return {
          currentPage: action.type,
          needBar: false,
          needFooter: false,

        }
      case 'artworkIntro':

        return {
          currentPage: 'artworkIntro',
          artwork: action.payload.artwork,
          needBar: true,
          needFooter: true,
        };
      default:
        setError('Invalid action');
    }
  }


  function authReducer(state, action) {
    switch (action.type) {
      case 'login':
        return {
          ...state,
          error: action.payload.error ?? state.error,
          username: action.payload.username ?? state.username,
          role: action.payload.role ?? state.role,
          liked: action.payload.liked ?? state.liked,
          isLoggedIn: true
        }
      case 'logout':
        return { ...state, username: null, role: null, isLoggedIn: false, error: '' }
      default:
        throw new Error('Invalid action')
    }
  }

  const [loginState, dispatchLogin] = useReducer(authReducer, initialLoginState);
  const [pageState, dispatchDirect] = useReducer(pageReducer, initPageState);
  const [categoryList, setCategoryList] = useState({});
  const [artworkList, setArtworkList] = useState([]);
  const [error, setError] = useState('');

  function dispatchPage(action) {
    setError('');
    dispatchDirect(action)
  }

  function checkForSession() {
    fetchSession()
      .then(({ userInfo }) => {
        if (!userInfo) {
          dispatchLogin({ type: 'logout' });
        } else {
          dispatchLogin({
            type: 'login',
            payload: {
              isLoggedIn: true,
              username: userInfo.username,
              role: userInfo.role,
            }
          });
        }
      })
      .catch(err => {
        setError(err?.error || 'ERROR');
      });

  }

  function toHome() {
    checkForSession();
    dispatchPage({ type: 'home' });
  }
  function toLoginPage() {
    dispatchPage({ type: 'login' });
  }

  function onLogin(username) {
    dispatchPage({ type: 'loading' });
    fetchLogin(username)
      .then(({ userInfo }) => {
        dispatchLogin({
          type: 'login', payload: {
            isLoggedIn: true,
            username: userInfo.username,
            role: userInfo.role,
            liked: userInfo.liked,
          }
        })
        dispatchPage({ type: 'home' });
      })
      .catch(err => {
        dispatchPage({ type: 'login' });
        setError(err?.error || 'ERROR');
      });
  }

  function onRegister(username) {
    dispatchPage({ type: 'loading' });
    fetchRegister(username)
      .then(({ userInfo }) => {
        dispatchLogin({
          type: 'login', payload: {
            isLoggedIn: true,
            username: userInfo.username,
            role: userInfo.role,
          }
        })
        dispatchPage({ type: 'home' });
      })
      .catch(err => {
        dispatchPage({ type: 'register' });
        setError(err?.error || 'ERROR');

      });
  }

  function onLogout() {
    fetchLogout()
      .then(() => {
        dispatchLogin({ type: 'logout' });
      })
      .catch(err => {
        setError(err?.error || 'ERROR');
      });
  }

  function toGallery() {
    dispatchPage({ type: 'loading' });
    checkForSession();
    fetchCategory()
      .then((data) => {
        setCategoryList(data.categoryList);
        dispatchPage({ type: 'gallery' });
      }
      )
      .catch(err => {
        dispatchPage({ type: 'home' });
        setError(err?.error || 'ERROR');

      }
      );
  }

  function toManage() {
    dispatchPage({ type: 'loading' });
    fetchSession()
      .then(({ userInfo }) => {
        if (userInfo.role !== 'admin') {
          throw new Error();
        }
        return fetchGetAll();
      })
      .then((data) => {
        setArtworkList(data.allArtworks);
        dispatchPage({ type: 'manage' });
      })
      .catch(err => {

        dispatchPage({ type: 'login' });
        setError(err?.error || 'ERROR');

      }
      );
  }

  function toPost() {
    dispatchPage({ type: 'loading' });
    fetchAllowPost()
      .then(({ userInfo }) => {
        return fetchCategory()
      })
      .then((data) => {
        setCategoryList(data.categoryList);
        dispatchPage({ type: 'post' });
      }
      )
      .catch(err => {
        if (err.error === 'auth-missing') {
          dispatchPage({ type: 'login' });
          setError(err?.error || 'ERROR');
        } else {
          dispatchPage({ type: 'home' });
          setError(err?.error || 'ERROR');
        }
      }
      );
  }
  function toIntro(id) {
    dispatchPage({ type: 'loading' });
    checkForSession();
    fetchArtworkIntro(id)
      .then(data => {
        dispatchPage({
          type: 'artworkIntro',
          payload: {
            artwork: data.artwork,
          },
        });
      }
      )
      .catch(err => {
        setError(err?.error || 'ERROR');
      });
  }

  useEffect(() => {
    checkForSession();
  }
    , []);
  return (
    <div className='app'>
      {error && <Error error={error} />}
      {pageState.needBar &&
        <Bar
          loginState={loginState}
          dispatchLogin={dispatchLogin}
          toLoginPage={toLoginPage}
          onLogout={onLogout}
          toGallery={toGallery}
          toHome={toHome}
          toPost={toPost}
          toManage={toManage}
        />}
      {pageState.currentPage === 'login' && <Login onLogin={onLogin} toHome={toHome} dispatchPage={dispatchPage} />}
      {pageState.currentPage === 'register' && <Register onRegister={onRegister} toHome={toHome} dispatchPage={dispatchPage} />}
      {pageState.currentPage === 'home' &&
        <Home
          toGallery={toGallery}
          toIntro={toIntro}
          dispatchPage={dispatchPage}
          setError={setError}
        />}
      {pageState.currentPage === 'loading' && <Loading />}
      {pageState.currentPage === 'gallery' && <Gallery
        categoryList={categoryList}
        toIntro={toIntro}
        checkForSession={checkForSession}
        setError={setError}
      />}
      {pageState.currentPage === 'artworkIntro' &&
        <ArtworkIntro
          dispatchPage={dispatchPage}
          dispatchLogin={dispatchLogin}
          loginState={loginState}
          artwork={pageState.artwork}
          toHome={toHome}
          setError={setError}
        />}
      {pageState.currentPage === 'post' && <Post categoryList={categoryList} dispatchPage={dispatchPage} setError={setError} />}
      {pageState.currentPage === 'manage' && <Manage artworkList={artworkList} dispatchPage={dispatchPage} setError={setError} />}
      {pageState.needFooter && <Footer />}
    </div>
  )
}


export default App;
