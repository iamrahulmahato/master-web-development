import sqlite3

# Connect to SQLite database
conn = sqlite3.connect('database.db')
c = conn.cursor()

# Create Users table
c.execute('''CREATE TABLE IF NOT EXISTS Users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                verified BOOLEAN DEFAULT 0
             )''')

# Create Course table
c.execute('''CREATE TABLE IF NOT EXISTS Course (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT,
                instructor TEXT,
                duration INTEGER,
                url TEXT
             )''')

# Create Course_Enrolled table
c.execute('''CREATE TABLE IF NOT EXISTS Course_Enrolled (
                uid INTEGER,
                cid INTEGER,
                status TEXT CHECK (status IN ('active', 'enrolled', 'completed')),
                FOREIGN KEY (uid) REFERENCES Users(id),
                FOREIGN KEY (cid) REFERENCES Course(id),
                PRIMARY KEY (uid, cid)
             )''')

c.execute('''CREATE TABLE IF NOT EXISTS Pathway (
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               name TEXT NOT NULL
            )''')

c.execute('''CREATE TABLE IF NOT EXISTS Pathway_Course (
               pid INTEGER,
               cid INTEGER,
               FOREIGN KEY (pid) REFERENCES Pathway(id),
               FOREIGN KEY (cid) REFERENCES Course(id),
               PRIMARY KEY (pid, cid)
            )''')

c.execute('''CREATE TABLE IF NOT EXISTS Module (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  name TEXT NOT NULL,
                  description TEXT,
                  url TEXT
               )''') 

c.execute('''CREATE TABLE IF NOT EXISTS Course_Module (
                  cid INTEGER,
                  mid INTEGER,
                  FOREIGN KEY (cid) REFERENCES Course(id),
                  FOREIGN KEY (mid) REFERENCES Module(id),
                  PRIMARY KEY (cid, mid)
               )''')

c.execute('''CREATE TABLE IF NOT EXISTS Course_Enrolled (
                  uid INTEGER,
                  cid INTEGER,
                  status TEXT CHECK (status IN ('active', 'enrolled', 'completed')),
                  FOREIGN KEY (uid) REFERENCES Users(id),
                  FOREIGN KEY (cid) REFERENCES Course(id),
                  PRIMARY KEY (uid, cid)
               )''')

c.execute('''CREATE TABLE IF NOT EXISTS User_Skills (
                  uid INTEGER,
                  skills TEXT,
                  career_goal TEXT,
                  FOREIGN KEY (uid) REFERENCES Users(id),
                  PRIMARY KEY (uid, career_goal)
         )''')

conn.commit()
conn.close()
