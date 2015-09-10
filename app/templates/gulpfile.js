'use strict';

process.env.JWT_PRIVATEKEY = 'secret';

require('require-dir')('./gulp');
