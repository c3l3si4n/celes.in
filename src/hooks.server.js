import * as Sentry from '@sentry/browser';
 
Sentry.init({
    dsn: "https://81d70e0b95b74fcfaedda89b8485097c@o460174.ingest.sentry.io/4504667394801664",
    
    tracesSampleRate: 1.0
  });
 


/** @type {import('@sveltejs/kit').HandleServerError} */
export function handleError({ error, event }) {
// example integration with https://sentry.io/
Sentry.captureException(error, { event });

return {
    message: 'Whoops!',
    code: error?.code ?? 'UNKNOWN'
};
}