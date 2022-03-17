import { css } from '~/lib/stitches.config';

const prism = css({
  overflowX: 'auto',
  lineHeight: 1,
  borderRadius: '$lg',
  code: {
    display: 'block',
    width: 'fit-content',
    minWidth: '100%',
    background: 'none',
    fontFamily: '$mono',
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    lineHeight: 1.6,
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: 4,
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
    py: '$4'
  },

  // Code Highlight Styles
  // Fallback variables
  '$$prism-line-inserted': 'rgba(16, 185, 129, 0.2)',
  '$$prism-line-deleted': 'rgba(239, 68, 68, 0.2)',

  '$$prism-prefix-inserted': 'rgba(16, 185, 129, 1)',
  '$$prism-prefix-deleted': 'rgba(239, 68, 68, 1)',

  '$$prism-line-number': '#888',

  '.code-line': { display: 'block', pl: '$4', pr: '$6' },
  '.code-line.inserted': { backgroundColor: '$$prism-line-inserted' },
  '.code-line.deleted': { backgroundColor: '$$prism-line-deleted' },
  '.line-number::before': {
    pr: '$4',
    color: '$$prism-line-number',
    display: 'inline-block',
    textAlign: 'right',
    content: 'attr(line)'
  },
  '.token.prefix': { padding: '0 0.5em' },
  '.token.prefix.inserted': { color: '$$prism-prefix-inserted' },
  '.token.prefix.deleted': { color: '$$prism-prefix-deleted' },

  variants: {
    theme: {
      gruvbox: {
        '$$prism-fg': '#ebdbb2',
        '$$prism-fg-dimm': 'rgba(235, 219, 178, 0.5)',
        '$$prism-bg': '#1d2021',

        '$$prism-fg-selection': '#fbf1c7',
        '$$prism-bg-selection': '#7c6f64',

        '$$prism-line-inserted': 'rgba(184, 187, 38, 0.2)',
        '$$prism-line-deleted': 'rgba(251, 73, 52, 0.2)',

        '$$prism-prefix-inserted': 'rgba(184, 187, 38, 1)',
        '$$prism-prefix-deleted': 'rgba(251, 73, 52, 1)',

        '$$prism-line-number': 'rgba(168, 153, 132, 0.3)',

        $$syntax1: '#a89984',
        $$syntax2: '#fb4934',
        $$syntax3: '#fabd2f',
        $$syntax4: '#d3869b',
        $$syntax5: '#b8bb26',

        color: '$$prism-fg-dimm',
        background: '$$prism-bg',

        // Selection; note: don't combine -moz prefix, it'll break the on non-Firefox browsers
        'code[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection':
          {
            color: '$$prism-fg-selection',
            background: '$$prism-bg-selection'
          },
        'code[class*="language-"]::selection, code[class*="language-"] ::selection':
          {
            color: '$$prism-fg-selection',
            background: '$$prism-bg-selection'
          },

        '.highlight-line': {
          color: '$$prism-fg',

          // Tokens
          '.token.comment, .token.prolog, .token.cdata': { color: '$$syntax1' },
          '.token.delimiter, .token.boolean, .token.keyword, .token.selector, .token.important, .token.atrule':
            {
              color: '$$syntax2'
            },
          '.token.operator, .token.punctuation, .token.attr-name': {
            color: '$$syntax1'
          },
          '.token.tag, .token.tag .punctuation, .token.doctype, .token.builtin':
            {
              color: '$$syntax3'
            },
          '.token.entity, .token.number, .token.symbol': { color: '$$syntax4' },
          '.token.property, .token.constant, .token.variable': {
            color: '$$syntax2'
          },
          '.token.string, .token.char': { color: '$$syntax5' },
          '.token.attr-value, .token.attr-value .punctuation': {
            color: '$$syntax1'
          },
          '.token.url': { color: '$$syntax5', textDecoration: 'underline' },
          '.token.function': { color: '$$syntax3' },
          '.token.regex': { background: '$$syntax5' },
          '.token.bold': { fontWeight: 'bold' },
          '.token.italic': { fontStyle: 'italic' },

          // lang-uri START
          '.token.scheme, .token.authority-delimiter, .token.query-delimiter, .token.pair-delimiter':
            {
              color: '$$syntax1'
            },
          '.token.path': { color: '$$syntax3' },
          '.token.pair': { color: '$$syntax4' },
          '.token.value': { color: '$$syntax5' }
          // lang-uri END
        }
        // '.token.inserted': { background: '$$syntax1' },
        // '.token.deleted': { background: '$$syntax2' }
      }
    }
  }
});

export default prism;