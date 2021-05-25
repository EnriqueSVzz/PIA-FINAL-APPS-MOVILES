

CREATE TABLE IF NOT EXISTS comentariostable(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    useName TEXT,
    resena TEXT,
    titulo TEXT,
);

INSERT or IGNORE INTO comentariostable(userName, titulo, resena) VALUES ('Enrique Vazquez',  'me gusto mucho la pelicula','Shrek');
INSERT or IGNORE INTO comentariostable(userName, titulo, resena) VALUES ('Luis Chacon', 'me gusto mucho la pelicula tambien','Shrek 2');
