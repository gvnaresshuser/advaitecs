import React from 'react';
import { AppProvider } from './ThemeContext';
import { ProfileCard } from './ProfileCard';
import { DashboardCard } from './DashboardCard'; // NEW

import './App.css';
function App() {
  return (
    <AppProvider>
      <h1 style={{ textAlign: 'center' }}>Context API Theme Switcher</h1>
      {/* <ProfileCard /> */}
      <DashboardCard /> {/* New Component Added */}
    </AppProvider>
  );
}

export default App;

{/* 
  <AppProvider>  
  <ProfileCard />

<AppProvider profession="Software Engineer">
<ProfileCard nameAttr="John" />
  */}