import blipp from 'blipp';
import good from 'good';
import goodConsole from 'good-console';
import hapiAuthJwt from 'hapi-auth-jwt';
import hapiPkg from 'hapi-pkg';
import tv from 'tv';
import {version} from '../../package.json';

const goodPlugin = {
  register: good,
  options: {
    reporters: [{
      reporter: goodConsole,
      events: { response: '*', log: '*', error: '*' }
    }],
    responsePayload: true
  }
};

const jwtPlugin = {
  register: hapiAuthJwt
};

const pkgPlugin = {
  register: hapiPkg,
  options: {
    pkg: { status: 'ok', version },
    endpoint: 'healthcheck',
    config: { auth: false, description: 'Health status and version' }
  }
};

const blippPlugin = {
  register: blipp,
  options: { showAuth: true }
};

const tvPlugin = {
  register: tv
};

/**
 * Loads plugins and returns a promise is resolved when all of the plugins
 * are finished loading. The promise is rejected if any errors occur.
 *
 * - Good / GoodConsole app logging.
 * - The healthcheck plugin
 *
 * @param server
 * @returns {Promise}
 */
function loadPlugins(server) {
  return new Promise((resolve, reject) => {
    // Put production necessary plugins here.
    let plugins = [ goodPlugin, jwtPlugin, pkgPlugin ];

    if (server.app.devMode) {
      // Add your dev plugins here.
      plugins = [ ...plugins, blippPlugin, tvPlugin ];
    }

    server.register(plugins, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export default loadPlugins;
