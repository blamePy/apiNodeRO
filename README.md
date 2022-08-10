ESCRIBIR LAS VARIABLES DE ENTORNO - .ENV
--PROD
HOST=147.182.199.194:1539/XEPDB1
DATABASE=XE
USER=LTOLEDO
PASSWORD=1112345
PORT=3008

--DESA
HOST=pablo-note:1521/XE
DATABASE=XE
USER=PRM
PASSWORD=a.123456
PORT=3008

Instalacion en docker.
1. Ejecutar: 
./node_modules/.bin/babel src --out-dir dist
2. Crear la imagen:
docker build -t archivos:latest .
3. levantar la imagen
docker run -p 3000:3000 archivos