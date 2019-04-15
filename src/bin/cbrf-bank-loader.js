#!/usr/bin/env node
import program from 'commander';
import debug from 'debug';
import downloadPage from '..';

const log = debug('cbrf-loader');

program
  .description('Download list banks to file')
  .version('0.0.1')
  .arguments('<path>')
  .option('-o, --output <path>', 'Output dir', process.cwd())
  .action((pathXML) => {
    log('Start working utilite');
    log(pathXML, program.output);
    downloadPage(pathXML, program.output)
      .then(() => log('Page and resourses were load'))
      .catch((err) => {
        console.error(err.message);
        process.exit(1);
      });
  })
  .parse(process.argv);
