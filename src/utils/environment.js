export const isDevEnv = process.env.NODE_ENV === 'development';
export const isProdEnv = process.env.NODE_ENV === 'production';
export const isGatsbyPreview = process.env.GATSBY_CLOUD === 'preview';

export const showUnderContruction = !isDevEnv || !isGatsbyPreview;
