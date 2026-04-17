import type { Preview } from '@storybook/nextjs-vite';

import '../src/app/_styles/global.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        mobile: {
          name: '건강해짐 Mobile',
          styles: { width: '440px', height: '900px' },
        },
      },
      defaultViewport: 'mobile',
    },
  },
};

export default preview;
