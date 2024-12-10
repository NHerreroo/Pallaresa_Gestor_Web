CREATE TABLE personas(correo varchar(100) PRIMARY KEY, nombre text, contraseña varchar(50));

CREATE TABLE roles(nombre varchar(100) PRIMARY KEY);

CREATE TABLE ficheros(enlace text, nombre text PRIMARY KEY, carpeta boolean);

create table persona_rol( 
    correo_Persona varchar(100), 
    nombre_Rol varchar(100), 
    
    constraint no_persona foreign key(correo_Persona) references personas(correo) 
    on update cascade on delete cascade, 
    
    constraint no_rol foreign key(nombre_Rol) 
    references roles(nombre) 
    on update cascade on delete cascade );


create table rol_fichero( 
    nombre_Rol varchar(100), 
    nombre_Fichero varchar(100), 
    
    constraint no_rol2 foreign key(nombre_Rol) 
    references roles(nombre) 
    on update cascade on delete cascade, 
    
    constraint no_fichero foreign key(nombre_Fichero) 
    references ficheros(nombre) 
    on update cascade on delete cascade);