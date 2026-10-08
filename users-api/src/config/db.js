import pg from "pg";//npm i pg
import dotenv from "dotenv";//npm i dotenv

dotenv.config();

const { Pool } = pg;
console.log(process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
/*
sslmode=require

Requires the PostgreSQL connection to use SSL/TLS encryption.
Protects data exchanged between the Node.js backend and PostgreSQL.
If an SSL connection cannot be established, the connection fails.
It does not necessarily mean strict certificate verification.

channel_binding=require

Requires channel binding during authentication.
Binds the authentication process to the established TLS connection.
Provides additional protection against certain authentication/interception attacks.
It is an additional security mechanism on top of SSL/TLS.
Easy way to remember
sslmode=require
        ↓
"Use an encrypted SSL/TLS connection."

channel_binding=require
        ↓
"Bind authentication to that secure connection."

Example:

DATABASE_URL=postgresql://...?...sslmode=require&channel_binding=require

So, in one sentence:

sslmode=require ensures encrypted communication, while channel_binding=require strengthens 
authentication by binding it to the secure TLS channel.
*/
/*
Managed PostgreSQL
       ↓
Follow provider's SSL configuration
       ↓
Usually no CA management by application developer
---------------------------------------------------
Company-managed PostgreSQL
       ↓
If strict certificate verification is required
       ↓
CA certificate
       ↓
rejectUnauthorized: true
*/
