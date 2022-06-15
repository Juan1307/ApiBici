# BICI - API

Api que provee las estaciones más cercanas, implementada con 3 servicios diferentes, puedes ver una [--DEMO--](https://api-bici.vercel.app/).

1. Servicio por defecto [+info](https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates).
1. Servicio de libreria  [+info](https://github.com/dcousens/haversine-distance).
1. Servicio de "google" [+info](https://developers.google.com/maps/documentation/javascript/reference#spherical).

El servicio 2 y 3 son similares, pero la 3 se basa en la API de **google maps - libreria: geometry**.

### Como usar la api.

- Puedes copiar el siguiente comando en tu terminal.
```
curl -v "https://api-bici.vercel.app/api/stations?latitude=20.666378&longitude=-103.34882&distance=1000"
```

- Puedes activar el servicio que prefieras, agrega un parametro opcional como ```engine = "google" ```, puedes usar **default, library y google**. 
```
curl -v "https://api-bici.vercel.app/api/stations?latitude=20.666378&longitude=-103.34882&distance=1000&engine=google"
```

### Bici-api: para desarrollo.

- No es buena practica dejar **.env**, en este caso para **desarrollo** es una excepción ya que por lo general se guardan datos sensibles.

- Después de hacer un fork o un clon de este repositorio ejecutar:
```
npm i // para las dependencias
npm run start //inicia modo desarrollo
```
- En **.env** puedes poner tu base de datos de postgresql, a través de una url de conexión si usas un servicio en la nube de psg-sql [+info]('https://node-postgres.com/').

- Para ejecutar los test hay 2 comandos
```
npm run test-con //1.- prueba la conexión de la api  
npm run test-api //2.- prueba que la api no regrese ninguna estación y otro test para obtener más de una estación 
```
