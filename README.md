<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Teslo Shop API
1.Clonar proyecto
```
git clone https://github.com/your-username/teslo-shop.git
```
2.Instalar dependencias
```
cd teslo-shop
npm install
```
3.Crear archivo .env
```
cp .env.template .env
```
4.Configurar archivo .env
```
DB_NAME=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_USERNAME=
SYNCHRONIZE=false
```
5.Levantar la base de datos
```
docker-compose up -d
```
6. Ejecutar SEED
```
{{baseURL}}api/seed
```
7.Iniciar la aplicación
```
npm run start:dev
```
