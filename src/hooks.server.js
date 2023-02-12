import * as Sentry from '@sentry/node';

import crypto from 'crypto';
 
Sentry.init({
    dsn: "https://81d70e0b95b74fcfaedda89b8485097c@o460174.ingest.sentry.io/4504667394801664",
  });
 
/** @type {import('@sveltejs/kit').HandleServerError} */
export function handleError({ error, event }) {
  const errorId = crypto.randomUUID();
  // example integration with https://sentry.io/
  Sentry.captureException(error, { event, errorId });
 
  return {
    message: 'Whoops!',
    errorId
  };
}