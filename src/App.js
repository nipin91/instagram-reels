import logo from './logo.svg';
import './App.css';
import Feeds from './feeds';
import React from 'react';
import { useBearStore } from './hooks/window-scroll';
import { feeds } from './mock/feeds'

function App() {
  const setEvent = useBearStore((state) => state.setEvent)

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const handleScroll = (event) => {
    setEvent(event);
  }

  const onScrollTo = (height) => {
    window.scrollTo({
      top: height,
      left: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className="App">
      {feeds && feeds.length && feeds.map((elem, index) => <Feeds onScrollTo={(height) => onScrollTo(height * index)}  {...elem} />)}
    </div>
  );
}

export default App;
