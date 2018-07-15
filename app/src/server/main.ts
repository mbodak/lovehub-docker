import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';

dotenv.config();

import { readFileSync } from 'fs';
import { join } from 'path';

import { enableProdMode } from '@angular/core';
import { renderModuleFactory } from '@angular/platform-server';
import {FOLDER_ASSETS, FOLDER_CLIENT, FOLDER_DIST} from '../shared/constants';

import { ApplicationModule } from './app.module';
import {HttpExceptionFilter} from './modules/common/filters/http-exception.filter';

const app = express();

async function bootstrap() {

  app.use(bodyParser.json({limit: '50mb'}));
  // app.use(bodyParser({limit: '50mb'}).json());

  if (process.env.NODE_ENV === 'production') {
    serverRender(app);
  } else {
    app.use('/assets', express.static(join(__dirname, '../assets')));
  }

  const server = await NestFactory.create(ApplicationModule, app, null);
  server.useGlobalFilters(new HttpExceptionFilter());
  await server.listen(process.env.PORT || 3666);
}

/**
 * Render Angular on Server Side instead on client
 *
 * @param {e.Express} expressApp
 */
function serverRender(expressApp: express.Express) {

  enableProdMode();

  // after build
  const template = readFileSync(join(FOLDER_DIST, FOLDER_CLIENT, 'index.html')).toString();

  const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../../dist/server/main.bundle');

  const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');

  expressApp.engine('html', (_, options, callback) => {
    renderModuleFactory(AppServerModuleNgFactory, {
      // Our index.html
      document: template,
      url: options.req.url,
      // DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
      extraProviders: [
        provideModuleMap(LAZY_MODULE_MAP),
      ],
    }).then(html => {
      callback(null, html);
    });
  });

  expressApp.set('view engine', 'html');
  expressApp.set('views', join(FOLDER_DIST, FOLDER_CLIENT));

  // Server static files from /client
  expressApp.use('/assets', express.static(join(FOLDER_DIST, FOLDER_ASSETS)));
  expressApp.get('*.*', express.static(join(FOLDER_DIST, FOLDER_CLIENT)));
}

bootstrap();
