/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-vue',
    'stylelint-config-property-sort-order-smacss',
  ],
  plugins: ['stylelint-scss', 'stylelint-order', 'stylelint-prettier'],
  overrides: [
    {
      files: ['*.scss', '**/*.scss'],
      customSyntax: 'postcss-scss',
      extends: ['stylelint-config-standard-scss', 'stylelint-config-recommended-vue/scss'],
      rule: {
        'scss/percent-placeholder-pattern': null,
      },
    },
    {
      files: ['**/*.(css|html|vue)'],
      customSyntax: 'postcss-html',
    },
  ],
  rules: {
    'no-descending-specificity': null,
    'at-rule-no-unknown': null,
    'selector-class-pattern': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['export', 'deep'],
      },
    ],
    'font-family-no-missing-generic-family-keyword': null,
    'import-notation': 'string',
    'no-empty-source': null,
    'property-no-unknown': null,
    'keyframes-name-pattern': null,
  },
}
