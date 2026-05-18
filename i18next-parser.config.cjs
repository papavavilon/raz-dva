module.exports = {
  locales: ['en', 'ua'],
  output: 'src/i18n/$LOCALE/translation.json',
  input: ['src/**/*.{js,jsx,ts,tsx}'],
  defaultNamespace: 'translation',
  keySeparator: false,
  namespaceSeparator: false,
  defaultValue: (locale, namespace, key) => (locale === 'en' ? key : ''),
  transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'b', 'p'],
  jsx: 'Trans',
};
