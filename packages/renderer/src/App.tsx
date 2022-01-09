import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [address, setAddress] = useState('http://127.0.0.1:8443');
  const [nickname, setNickname] = useState('Jon_Doe');
  const [launchState, setLaunchState] = useState(0);

  const getLaunchButtonLabel = () => {
    switch (launchState) {
      case 0:
        return 'Play';
      case 1:
        return 'Launching';
      case 2:
        return 'Playing Now';
      default:
        return 'Play';
    }
  };

  const onOpen = () => {
    setLaunchState(2);
  };

  const onClose = () => {
    setLaunchState(0);
    console.log('exit');
  };

  const onError = (code: number | null) => {
    console.log('Failed to launch with error code:', code);
  };

  const launchServer = () => {
    setLaunchState(1);
    try {
      window.servers.launch({ address, nickname, onSuccess: onOpen, onError, onClose });
    } catch (error) {
      setLaunchState(0);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React! (v1)</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>

        <p>
          <div>
            <input
              type="text"
              placeholder="Server address"
              onChange={(e) => setAddress(e.currentTarget.value)}
              value={address}
            />
            /
            <input
              type="text"
              placeholder="Player nickname"
              onChange={(e) => setNickname(e.currentTarget.value)}
              value={nickname}
            />
          </div>
          <button type="button" onClick={launchServer} disabled={launchState !== 0}>
            {getLaunchButtonLabel()}
          </button>
        </p>
      </header>
    </div>
  );
}

export default App;
