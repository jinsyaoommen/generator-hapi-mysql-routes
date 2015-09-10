var chalk = require('chalk');
var superb = require('superb');
var generators = require('yeoman-generator');
var yosay = require('yosay');
var _s = require('underscore.string');
var _ = require('lodash');

// Prevent templating of ECMA 6 {} deconstruction syntax as template vars.
_.templateSettings.interpolate = /<%=([\s\S]+?)%>/g;

module.exports = generators.Base.extend({

  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Welcome to the ' + chalk.blue('Hapi Mysql API Routes') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'What would you like to call this project?',
        default: this.appname.replace(/\s/g, '-'),
        filter: function(val) {
          return _s.slugify(val);
        }
      },
      {
        type: 'input',
        name: 'serviceName',
        message: 'How would you like to identify the service?',
        default: this.appname.replace(/\s/g, '-'),
        filter: function(val) {
          return _s.slugify(val);
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Describe your service',
        default: 'My ' + superb() + ' service.'
      },
      {
        name: 'githubUsername',
        message: 'What is the GitHub username?',
        store: true,
        validate: function(val) {
          return val.length > 0 ? true : 'You have to provide a username';
        }
      }
    ];

    this.prompt(prompts, function (props) {
      props.name = this.user.git.name();
      props.email = this.user.git.email();

      this.props = props;

      done();
    }.bind(this));
  },
  writing: {
    serviceFiles: function() {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        this.props
      );

      var server = _.template(
        this.fs.read(this.templatePath('es6/_server.js'))
      );
      this.fs.write(this.destinationPath('es6/server.js'), server(this.props));
    },
    gulpFiles: function() {
      this.fs.copy(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );
      this.directory(
        this.templatePath('gulp'),
        this.destinationPath('gulp')
      );
    }
  },
  method1: function () {
    console.log('method 1 just ran');
  },
  method2: function () {
    console.log('method 2 just ran');
  },
  install: function() {
    this.installDependencies({bower: false});
  }
});
