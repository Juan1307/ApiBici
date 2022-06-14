import { Client } from 'pg';

const client = new Client({ connectionString: process.env.CLIENT_PG_URL });

client.connect();

export default client;
