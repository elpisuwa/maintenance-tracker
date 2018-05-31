const createTable = 'DROP TABLE IF EXIST requests CASCADE;'
'CREATE TABLE requests' +
'(' +
    'id serial NOT NULL,' +
    'user_id integer,' +
    'item character(50),' +
    'request_type character(50),' +
    'request_description character(250),' +
    'status character(100),' +
    'PRIMARY KEY (id)' +
')'

const createUser = `${'CREATE TABLE users;'`${'('`id serial NOT NULL,${
  +'username integer,'
}"email " character(50),`
}password character(150),`
}PRIMARY KEY (id)` +
')'

