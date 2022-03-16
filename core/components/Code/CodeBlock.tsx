import { styled } from '~/lib/stitches.config';
import Highlight, { defaultProps, Prism } from 'prism-react-renderer';

import { CopyToClipboardButton } from '~/components/Button';
import Card from '~/components/Card';
import { calculateLinesToHighlight, hasTitle } from './utils';
import type { CodeBlockProps, HighlightedCodeTextProps } from '.';

// @ts-ignore
(typeof global !== 'undefined' ? global : window).Prism = Prism;

/**
 * This imports the syntax highlighting style for the Swift language
 */
require('prismjs/components/prism-swift');

export const HighlightedCodeText = (props: HighlightedCodeTextProps) => {
  const { codeString, language, highlightLine } = props;

  return (
    <Highlight
      {...defaultProps}
      theme={{ plain: {}, styles: [] }}
      code={codeString}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          {tokens.map((line, index) => {
            const { className: lineClassName } = getLineProps({
              className: highlightLine
                ? highlightLine(index)
                  ? 'highlight-line'
                  : 'basic'
                : '',
              key: index,
              line
            });

            return (
              <Line key={index} className={lineClassName}>
                <LineNo>{index + 1}</LineNo>
                <LineContent>
                  {line.map((token, key) => {
                    return (
                      <span
                        key={key}
                        {...getTokenProps({
                          key,
                          token
                        })}
                      />
                    );
                  })}
                </LineContent>
              </Line>
            );
          })}
        </Pre>
      )}
    </Highlight>
  );
};

const CodeBlock = (props: CodeBlockProps) => {
  const { codeString, language, metastring } = props;

  const highlightLineFn = calculateLinesToHighlight(metastring);
  const title = hasTitle(metastring);

  return (
    <Card
      css={{
        marginBottom: '32px',
        background: 'unset',

        '@media(max-width: 750px)': {
          width: '100vw',
          position: 'relative',
          left: '50%',
          right: '50%',
          mx: '-50vw',
          borderRadius: '0px'
        }
      }}
    >
      {title && (
        <Card.Header
          css={{
            padding: '0px 16px',
            bc: 'var(--code-snippet-background)'
          }}
        >
          <CodeSnippetTitle>{title}</CodeSnippetTitle>
          <CopyToClipboardButton title={title} text={codeString} />
        </Card.Header>
      )}
      <HighlightedCodeText
        codeString={codeString}
        language={language}
        highlightLine={highlightLineFn}
      />
    </Card>
  );
};

export default CodeBlock;

const Pre = styled('pre', {
  my: '0',
  textAlign: 'left',
  padding: '8px 0px',
  overflow: 'auto',
  bbr: '$2',
  fontFamily: '$mono',
  fontSize: '$1',
  lineHeight: '26px'
});

const Line = styled('div', {
  display: 'table',
  borderCollapse: 'collapse',
  padding: '0px 14px',
  borderLeft: '3px solid transparent',

  '&.highlight-line': {
    background: 'var(--laodeaksar-colors-emphasis)',
    borderColor: 'var(--laodeaksar-colors-brand)'
  },

  '&:hover': {
    bc: 'var(--laodeaksar-colors-emphasis)'
  }
});

const LineNo = styled('div', {
  width: '45px',
  padding: '0 12px',
  userSelect: 'none',
  opacity: '1',
  color: 'var(--laodeaksar-colors-typeface-tertiary)'
});

const LineContent = styled('span', {
  display: 'table-cell',
  width: '$full'
});

const CodeSnippetTitle = styled('p', {
  marginBlockStart: '0px',
  fontSize: '$1',
  marginBottom: '0px',
  color: 'var(--laodeaksar-colors-typeface-primary)',
  fontWeight: '$3'
});
