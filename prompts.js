module.exports = [
{
  name: 'ROUTING_MODE',
  message: 'Vue Router routing mode?',
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
  name: 'DEFAULT_LOCALE',
  message: 'Default i18n locale for app(user=browser locale detected)?',
  description: '(user=browser locale detected) or i18n supported locales',
  default: 'user',
},
{
  type: 'input',
  name: 'FALLBACK_LOCALE',
  message: 'Fallback locale, if default fails?',
  description: 'Locale you support no matter what. Its the first locale added to app.',
  default: 'en',
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
    name: 'I18N_ENABLED',
    type: 'confirm',
    message: 'Enable i18n loading in your project?',
    default: true
},
{
    name: 'IS_DESTROYABLE',
    type: 'confirm',
    message: 'Delete orphaned files from VueJS example project? (Destructive)',
    default: false
}];