import React from 'react';
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useAnimation,
  useMotionValue,
  useTransform
} from 'framer-motion';
import { PrismTheme } from 'prism-react-renderer';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import { styled } from '~/lib/stitches.config';

import Pill from '~/components/Pill';

import type { CodeBlockProps } from './types';

const LiveCodeBlock = (props: CodeBlockProps) => {
  const { codeString, live, render } = props;

  const scope = {
    motion,
    AnimatePresence,
    LayoutGroup,
    useAnimation,
    useMotionValue,
    useTransform,
    styled,
    Pill,
    React
  };

  const customTheme = {
    styles: [],
    plain: {}
  } as PrismTheme;

  if (live) {
    return (
      <LiveProvider
        theme={customTheme}
        code={codeString}
        scope={scope}
        noInline={true}
      >
        <StyledLiveCodeWrapper>
          <StyledPreviewWrapper withEditor>
            <LivePreview />
            <StyledErrorWrapper>
              <LiveError />
            </StyledErrorWrapper>
          </StyledPreviewWrapper>
          <StyledEditorWrapper>
            <LiveEditor />
          </StyledEditorWrapper>
        </StyledLiveCodeWrapper>
      </LiveProvider>
    );
  }

  if (render) {
    return (
      <LiveProvider code={codeString} scope={scope} noInline={true}>
        <StyledLiveCodeWrapper>
          <StyledPreviewWrapper>
            <LivePreview />
          </StyledPreviewWrapper>
        </StyledLiveCodeWrapper>
      </LiveProvider>
    );
  }

  return null;
};

export default LiveCodeBlock;

const StyledLiveCodeWrapper = styled('div', {
  position: 'relative',
  backdropFilter: 'blur(6px)',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '32px',
  borderRadius: '$2',
  overflow: 'hidden',

  '@media (max-width: 750px)': {
    display: 'block'
  },

  '@media (max-width: 1200px)': {
    width: '$ws',
    left: '50%',
    right: '50%',
    mx: '-50vw',
    borderRadius: '0px'
  },

  '@media (min-width: 1200px)': {
    position: 'relative',
    width: 'calc(100% + 200px)',
    mx: '-100px'
  }
});

const StyledEditorWrapper = styled('div', {
  flex: '50 1 0%',
  height: '$full',
  maxHeight: '600px',
  overflow: 'auto',
  margin: '0',

  'textarea:focus': {
    outline: 'none'
  },

  'pre, textarea': {
    bc: 'var(--code-snippet-background) !important',
    fontFamily: '$mono !important',
    fontSize: '$1 !important',
    lineHeight: '26px !important'
  }
});

const StyledPreviewWrapper = styled('div', {
  maxHeight: '600px',
  flex: '50 1 0%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  bc: 'var(--laodeaksar-colors-emphasis)',
  overflow: 'hidden',

  '@media (max-width: 750px)': {
    borderRadius: '0px !important'
  },

  variants: {
    withEditor: {
      true: {
        minHeight: '600px'
      },
      false: {
        minHeight: '300px'
      }
    }
  }
});

const StyledErrorWrapper = styled('div', {
  color: 'var(--laodeaksar-colors-typeface-secondary)',
  maxWidth: '300px',

  pre: {
    padding: '15px',
    marginBottom: '0px'
  }
});
