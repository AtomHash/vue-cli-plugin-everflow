module.exports = [
{
  name: 'ROUTING_MODE',
  description: 'Vue Router routing mode. Hash(#/home) or History(/home)? ',
  type: 'list',
  default: 'hash',
  choices: [
  {
    name: 'hash mode',
    value: 'hash'
  },
  {
    name: 'history mode',
    value: 'history'
  }
  ],
},
{
  type: 'input',
  name: 'API_URL',
  message: 'What is the root API URL for your server?',
  description: 'This will be added to evconfig.json.',
  default: 'https://api.localhost',
},
{
  type: 'input',
  name: 'DATE_FORMAT',
  message: 'Date util class serialize format?',
  description: 'This will be added to evconfig.json.',
  default: 'YYYY-MM-DD',
},
{
  type: 'input',
  name: 'TIME_FORMAT',
  message: 'Time util class serialize format?',
  description: 'This will be added to evconfig.json.',
  default: 'HH:mm:ss',
},
{
    name: 'IS_DESTROYABLE',
    type: 'confirm',
    message: 'Delete orphaned files from VueJS example project? (Destructive)',
    default: false
}];