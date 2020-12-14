import React from 'react';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Header />
      <main style={{ minHeight: '80vh' }}>
        <Body />
      </main>
      <Footer />
    </>
  );
};

export default App;
