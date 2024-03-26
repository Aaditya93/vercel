// Importing necessary modules
const mysql = require('mysql');
require('dotenv').config(); 

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port:"3306",
  user: process.env.DATABASE_USER ,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DB_DATABASE,

}); 

db.connect((err: any) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to the database.');

})


export function executeQuery(query:string) {
  db.query(query, (err:any, result:any) => {
    if (err) {
      console.error('Error executing query:', err);
      
    } else {
      console.log('Query executed successfully:', result);

    }
  });
}
 
/* export const addEntry = (id:string, uploaded:boolean) => {
  const insertQuery = `INSERT INTO your_table_name (id, uploaded) VALUES ('${id}', ${uploaded ? 1 : 0})`;
  executeQuery(insertQuery);
};
 */

export const addEntry = async (id:string, uploaded:boolean, callback:any) => {
  const uploadedValue = uploaded ? 1 : 0;
  const insertQuery = `INSERT INTO vercel (id, uploaded) VALUES ('${id}', ${uploadedValue})`;

  try {
    const result = await executeQuery(insertQuery);
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
};

/* const createTableQuery = `
  CREATE TABLE IF NOT EXISTS vercel (
    id VARCHAR(255) NOT NULL,
    uploaded BOOLEAN,
    deployed BOOLEAN,
    PRIMARY KEY (id)
  )
`; */


/* const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DATABASE_USER ,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DB_DATABASE,
  connectTimeout: 20000, // Increase connection timeout (milliseconds)
  timeout: 20000 
});

// Execute the SQL query to create the table
pool.getConnection((err: any, connection: { query: (arg0: string, arg1: (error: any, results: any) => void) => void; release: () => void; }) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
  
    // Use the connection to execute the SQL query
    connection.query(`
      CREATE TABLE IF NOT EXISTS your_table_name (
        name VARCHAR(255),
        uploading BOOLEAN,
        deployed BOOLEAN
      )
    `, (error, results) => {
      // When done with the connection, release it
      connection.release();
  
      if (error) {
        console.error('Error creating table:', error);
        return;
      }
  
      console.log('Table created successfully:', results);
    });
  }); */