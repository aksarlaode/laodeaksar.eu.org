export const sanityConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || ('production' as string),
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  useCdn: process.env.NODE_ENV !== 'production',
  apiVersion: '2021-03-25'
};
