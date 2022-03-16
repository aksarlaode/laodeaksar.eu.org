import type { PropsWithChildren } from 'react';

import Box from '~/components/Box';

import { StyledGlow } from './Styles';

const Glow = (props: PropsWithChildren<{}>) => {
  const { children, ...rest } = props;

  return (
    <Box
      css={{
        position: 'relative',
        maxWidth: '$max'
      }}
      {...rest}
    >
      <StyledGlow />
      {children}
    </Box>
  );
};

export default Glow;
