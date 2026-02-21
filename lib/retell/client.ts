// lib/retell/client.ts
// Retell SDK singleton for server-side use ONLY.
// This file must NEVER be imported from client-side code.
// The environment variable guard below will throw at module load time if this
// module is accidentally bundled into the browser (where process.env is undefined).
import Retell from 'retell-sdk';

if (!process.env.RETELL_API_KEY) {
  throw new Error(
    'RETELL_API_KEY is not defined. This module must only be imported server-side.'
  );
}

export const retell = new Retell({
  apiKey: process.env.RETELL_API_KEY,
});
