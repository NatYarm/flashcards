module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-sass-guidelines',
  ],
  plugins: [],
  rules: {
    indentation: 2,
    'max-nesting-depth': 3,
    'selector-max-compound-selectors': 3,
    'no-descending-specificity': null,
    'scss/percent-placeholder-pattern': null,
    'scss/at-import-partial-extension-blacklist': null,
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['composes'], 
      },
    ],
  },
}
