import { Pool } from 'pg'

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'masterkey',
    database: 'postgres',
    port: 5432
})

