module.exports = {
  locales: ['en', 'ua'],
  output: 'src/i18n/$LOCALE/translation.json',
  input: ['src/**/*.{js,jsx,ts,tsx}'],
  defaultNamespace: 'translation',
  keySeparator: false,
  namespaceSeparator: false,

  defaultValue: (locale, namespace, key, value) => {
    if (locale === 'en') {
      return value || key;
    }
    return '';
  },

  lexers: {
    js: ['JavascriptLexer'],
    ts: ['JavascriptLexer'],
    jsx: [
      {
        lexer: 'JsxLexer',
        transSupportBasicHtmlNodes: true,
        transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'b', 'p'],
      },
    ],
    tsx: [
      {
        lexer: 'JsxLexer',
        transSupportBasicHtmlNodes: true,
        transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'b', 'p'],
      },
    ],
  },
};
