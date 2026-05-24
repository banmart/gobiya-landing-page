import { StrictMode } from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App';

export function render() {
  const html = ReactDOMServer.renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
  return { html };
}
