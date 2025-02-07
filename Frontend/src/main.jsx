import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Bounce, ToastContainer } from 'react-toastify';
import { AuthHandler } from './components/AuthHandler.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';

const queryClient = new QueryClient()
const clientId = '16251777216-dd3pc5ijoaortms154feacbh5ntpd20t.apps.googleusercontent.com' 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AuthHandler>
            <App />
          </AuthHandler>
        </QueryClientProvider>
      </Provider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </GoogleOAuthProvider>
  </StrictMode>
)
