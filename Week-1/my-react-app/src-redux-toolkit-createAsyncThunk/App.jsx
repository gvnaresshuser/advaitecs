// src/App.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './features/user/userSlice';
import { toggleTheme } from './features/theme/themeSlice';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  const userStatus = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);
  const isDark = useSelector((state) => state.theme.darkMode);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <h1 className="text-3xl font-bold mb-4">Redux Toolkit Multi Slice + Async</h1>

      <button onClick={() => dispatch(fetchUser())} className="bg-blue-500 px-4 py-2 text-white rounded mb-4">
        Fetch User
      </button>

      {userStatus === 'loading' && <p>Loading user...</p>}
      {user && (
        <div className="p-4 border rounded shadow w-fit">
          <h2 className="text-xl">👤 {user.name}</h2>
          <p>📧 {user.email}</p>
          <p>📱 {user.phone}</p>
        </div>
      )}

      {error && (
        <div className="p-4 border rounded shadow w-fit bg-red-100 text-red-800">
          <p>❌ Error: {error}</p>
        </div>
      )}


      <button onClick={() => dispatch(toggleTheme())} className="mt-6 bg-purple-600 px-4 py-2 text-white rounded">
        Toggle Theme
      </button>
    </div>
  );
}

export default App;
