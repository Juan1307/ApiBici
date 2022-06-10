import { Client } from 'pg';

const client = new Client({
  connectionString: 'postgres://isevzwhx:xzdTSQrsKSVPgUJVHMuCrT6kAhUw8w_1@kesavan.db.elephantsql.com/isevzwhx' 
});

client.connect();

export default client;
