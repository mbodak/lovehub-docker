# Angular NestJS - LoveHub

- src/client <-- Angular 5+
- src/server <-- NestJS
- src/shared <-- Shared between apps

# doc
- proxy.conf.json https://juristr.com/blog/2016/11/configure-proxy-api-angular-cli/
- why do we have in client/app/app.server.module? - for server rendering http://stepansuvorov.com/blog/2017/03/server-side-rendering-angular4/
- about angular folder structure https://medium.com/@motcowley/angular-folder-structure-d1809be95542
- aot flag in npm start https://angular.io/guide/aot-compiler
  
### Install

```bash
npm install
```
### Requirements

To run the application you need to have Postgres 9.6 and Mongodb 3.6.x.

Create a config file `src/server/config/config.yml` with following content (change according to your ):

```yaml
mongo:
  host: 'username:password@localhost'
  port: 27017
  db: 'lovehub'

postgres:
  host: 'localhost'
  port: 5432
  user: 'username'
  pass: '1111'
  db: 'lovehub'
```

### Development

* Development port is on: 4200 ( inherited from angular-cli )
* In development, every controller ( route ) from NestJS must be mapped in proxy.conf.json*

```bash
npm start
```

### Production

* Production port is specified in .env ( default to 5400 )

```bash
npm run build:universal
```

```bash

# test production

npm run serve:universal
```
