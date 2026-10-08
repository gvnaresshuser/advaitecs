// src/App.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost } from './features/posts/postsSlice';
import { toggleTheme } from './features/theme/themeSlice';

function App() {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts.post);
  console.log(JSON.stringify(post));
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);
  const isDark = useSelector((state) => state.theme.darkMode);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-500
      ${isDark ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white' : 'bg-gradient-to-b from-blue-100 via-purple-100 to-pink-100 text-gray-900'}`}>

      <h1 className="text-4xl font-extrabold mb-6 text-center bg-clip-text text-transparent 
        bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        Redux Toolkit AsyncThunk Assignment
      </h1>

      <button
        onClick={() => dispatch(fetchPost())}
        className="mb-6 px-6 py-3 rounded-lg font-semibold text-white 
          bg-gradient-to-r from-green-400 to-blue-500 shadow-lg hover:from-green-500 hover:to-blue-600 transition-colors"
      >
        Fetch Post
      </button>

      {status === 'loading' && (
        <p className="text-yellow-500 font-medium animate-pulse">Loading post...</p>
      )}
      {status === 'succeeded' && (
        <p className="text-yellow-500 font-medium animate-pulse">Loded Posts.</p>
      )}

      {post && (
        <div className="p-6 rounded-xl shadow-2xl w-full max-w-md
          bg-gradient-to-br from-white via-gray-100 to-gray-200 text-gray-900
          dark:bg-gray-800 dark:from-gray-700 dark:to-gray-900 dark:text-white transition-colors">
          <h2 className="text-2xl font-bold mb-3 text-blue-600 dark:text-blue-400">{post.title}</h2>
          <p className="text-gray-700 dark:text-gray-300">{post.body}</p>
        </div>
      )}

      {error && (
        <p className="mt-4 text-red-600 font-semibold bg-red-100 px-4 py-2 rounded-lg shadow">
          ❌ Error: {error}
        </p>
      )}

      <button
        onClick={() => dispatch(toggleTheme())}
        className="mt-8 px-6 py-3 rounded-lg font-semibold text-white 
          bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
      >
        Toggle Theme
      </button>
    </div>
  );
}

export default App;
