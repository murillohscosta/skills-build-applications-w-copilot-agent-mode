import { app, PORT, baseUrl } from './server.js';

app.listen(PORT, () => {
  console.log(`Backend server listening on ${baseUrl}`);
});
