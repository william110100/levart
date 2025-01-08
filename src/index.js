import React from 'react';
import ReactDOM from 'react-dom';
import mainApp from './MainApp';

const rootEl = document.getElementById('app-site');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service worker running, scope is:', registration.scope);
    })
    .catch((err) => {
      console.log('Service worker registration failed, error:', err);
    });
}

// Create a reusable render method that we can call more than once
const render = () => {
  // Dynamically import our main App component, and render it
  const MainApp = mainApp;
  ReactDOM.render(
    <MainApp />,
    rootEl
  );
};

if (module.hot) {
  module.hot.accept('./MainApp', () => {
    const MainApp = mainApp;
    render(
      <MainApp />,
      rootEl
    );
  });
}

render();
