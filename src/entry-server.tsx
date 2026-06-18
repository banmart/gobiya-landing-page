import { StrictMode } from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App';

export function render(url: string) {
  const html = ReactDOMServer.renderToString(
    <StrictMode>
      <App url={url} />
    </StrictMode>
  );
  return { html };
}
