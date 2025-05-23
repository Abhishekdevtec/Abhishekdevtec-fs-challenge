import React, { useState } from 'react';
import UrlForm from './components/UrlForm';
import TopUrls from './components/TopUrls';

function App() {
  const [reloadFlag, setReloadFlag] = useState(false);

  const triggerReload = () => {
    setReloadFlag(!reloadFlag);
  };

  return (
    <div style={{ padding: '20px' }}>
      <UrlForm onUrlCreated={triggerReload} />
      <TopUrls key={reloadFlag} />
    </div>
  );
}

export default App;
