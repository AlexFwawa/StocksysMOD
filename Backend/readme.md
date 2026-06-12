Configuracion de Inicio
En root del proyecto, osea aca.. donde esta este readme, levantar docker con:
docker compose up -d

para listar el contenedor y ver el status:
docker ps -a

pueden probar conectarse por workbench y deberia andar
user: root
pass: 1234
port: 27017

Cuando se hace "docker compose up" se crean solo el rol ADMIN, ademas de un usuario administrador

Por defecto se crea: User: adminbpf@gmail.com Password: 123456

Se puede cambiar en las variables de entorno en application.propierties:

- ADMIN_USERNAME
- ADMIN_PASSWORD