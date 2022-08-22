import Image from 'next/image';

import { Flex, Text } from '@laodeaksarr/design-system';

import SpotifyLogo, { Glass } from './icons';
import { styles } from './Styles';

import { useNowPlaying } from '~/hooks/useNowPlaying';

const Bars = () => (
  <Flex className={styles.bars}>
    <span />
    <span />
    <span />
    <span />
  </Flex>
);

const NowPlaying = () => {
  const { data /*, loading*/ } = useNowPlaying();

  return (
    <a
      href={data?.isPlaying ? data.url : undefined}
      className={styles.outer}
      target="_blank"
      rel="noreferrer"
    >
      <Glass />
      <Flex className={styles.inner} gap={0}>
        <Flex gap={3}>
          <Flex className={styles.cover} justifyContent="center">
            {data?.isPlaying ? (
              <Image
                unoptimized
                src={data.image?.url || ''}
                alt={[data.title] + ' Cover Album'}
                layout="fill"
              />
            ) : (
              <SpotifyLogo />
            )}
          </Flex>
          <Flex direction="column" alignItems="start" gap={0}>
            <Text
              as="p"
              size={2}
              weight={4}
              variant="secondary"
              truncate
              className={styles.title}
            >
              {data?.isPlaying ? data.title : 'Spotify'}
            </Text>
            {data?.isPlaying ? (
              <>
                <Text
                  size={1}
                  variant="tertiary"
                  truncate
                  className={styles.artist + ' artists'}
                >
                  {data.artist}
                </Text>
                <Text size={1} className={styles.artist + ' play'}>
                  Play on Spotify
                </Text>
              </>
            ) : (
              <Text size={1} variant="tertiary" className={styles.artist}>
                {data ? 'Not Playing' : 'Loading...'}
              </Text>
            )}
          </Flex>
        </Flex>
        {data?.isPlaying && <Bars />}
      </Flex>
    </a>
  );
};

export default NowPlaying;
