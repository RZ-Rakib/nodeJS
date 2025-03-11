# Postgre install,guide to create first database

1. Install postgre from [postgre](https://www.postgresql.org/download/)
## 2. Open the SQL Shell
3. macOS or Linux, can start psql by typing `psql postgres` in terminal
4. press 4 times for the default valus set earlier in installation process.
![alt text](https://vw5.viope.com/content/f291e5c33c58690b4f4d7e169eb527e8c0039166/sqlshell1.PNG)
---
5. create new database `CREATE DATABASE name`.
![alt text](https://vw5.viope.com/content/f291e5c33c58690b4f4d7e169eb527e8c0039166/sqlshell2.PNG)
---
6. check list of database `\l`
![alt text](https://vw5.viope.com/content/f291e5c33c58690b4f4d7e169eb527e8c0039166/sqlshell3.PNG)
---
7. to connect a specific database `\c name`
![alt text](https://vw5.viope.com/content/f291e5c33c58690b4f4d7e169eb527e8c0039166/sqlshell4.PNG) 
---
8. crete a table by usoing SQL statement to the SQL shell.example tabel for movie
```bash
CREATE TABLE movies (
  id serial PRIMARY KEY,
  title VARCHAR (200) NOT NULL,
  director VARCHAR (200) NOT NULL, 
  year INTEGER NOT NULL 
);
```
![alt text](https://vw5.viope.com/content/f291e5c33c58690b4f4d7e169eb527e8c0039166/sqlshell5.PNG)
---
9. to verify created table `\d`
![alt text](https://vw5.viope.com/content/f291e5c33c58690b4f4d7e169eb527e8c0039166/sqlshell6.PNG)
---
10. insert some data bybusing SQL statement, example data for movie database
```bash
INSERT INTO movies (title, year, director) VALUES ('Star Wars: Episode IX - The Rise of Skywalker', 2019,'J.J. Abrams');
INSERT INTO movies (title, year, director) VALUES ('The Irishman', 2019, 'Martin Scorsese');
INSERT INTO movies (title, year, director) VALUES ('Harry Potter and the Sorcerers Stone', 2001, 'Chris Columbus');
```
11. type `SELECT * FROM table_name` to verify the data are inserted. 
![alt text](https://vw5.viope.com/content/f291e5c33c58690b4f4d7e169eb527e8c0039166/sqlshell8.PNG)
12. create `,./db/config.js` a configure file. 
```bash
const { Pool } = require('pg')

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  port: 5432,
  database: "movie",
  password: "YOUR_DB_PASSWORD"
})

module.exports = {
  query: (text, params) => pool.query(text, params),
}
```
13. You can check these settings by typing \conninfo command in the SQL Shell![alt text](https://vw5.viope.com/content/f291e5c33c58690b4f4d7e169eb527e8c0039166/sqlshell_conninfo.PNG)