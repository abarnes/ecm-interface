import program from 'commander';

import { connect, close } from './SerialConnector';

program
  .version('1.0.0')         // see if these values can be pulled from package.json
  .description('PowerFC Interface');

program
  .command('connect')
  .alias('c')
  .description('Connect to the PowerFC')
  .action(connect);

program
  .command('disconnect')
  .alias('d')
  .description('Disconnect the PowerFC')
  .action(close);

/*
program
  .command('getContact <name>')
  .alias('r')
  .description('Get contact')
  .action(name => getContact(name));
*/

program.parse(process.argv);