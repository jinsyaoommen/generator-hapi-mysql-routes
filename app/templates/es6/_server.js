import {Server} from 'hapi';
import config from 'config';
import good from 'good';
import goodConsole from 'good-console';
import hapiMysqlRoutes from 'hapi-mysql-routes-plugin';
import hapiSwaggered from 'hapi-swaggered';
import hapiSwaggeredUi from 'hapi-swaggered-ui';
import Inert from 'inert';
import Joi from 'joi';
import knex from 'knex';
import pkg from '../package';
import Vision from 'vision';

const port = 9000;
const server = new Server();
server.connection({port});

server.start(() => {
  server.log(
    ['<%= serviceName %>', 'info'],
    `Server running at: ${server.info.uri}`
  );
});
