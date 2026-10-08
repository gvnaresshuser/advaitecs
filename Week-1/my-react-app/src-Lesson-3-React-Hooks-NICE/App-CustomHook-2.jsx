
import React from 'react';
import './App.css';
import useLocalStorage from './hooks/useLocalStorage';

//WITH USING CUSTOM HOOK

function App() {
  //-------------------------------------------------
  //REMOVE BELOW CODE INTO useLocalStorage CUSTOM HOOK
  /*  const [name, setName] = useState(
     localStorage.getItem('username') ?
       localStorage.getItem('username') : ''
   );
   useEffect(() => {
     localStorage.setItem('username',name) 
   }, [name]); */
  //-------------------------------------------------
  const [name, setName] = useLocalStorage('username', '');
  //ADD MULTIPLE VALUES USING CUSTOM HOOK
  const [id, setId] = useLocalStorage('userid', '');

  //https://youtu.be/6wf5dIrryoQ
  return (
    <>
      <section id="center">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-xl shadow-lg text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">
            Custom Hook
          </h1>

        </div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text" placeholder='Enter your name' />
        <h2>Hello, {name}!</h2>

        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          type="text" placeholder='Enter your id' />
        <h2>Your ID, {id}!</h2>

      </section>
    </>
  );
}

export default App;
