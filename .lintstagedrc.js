const path = require('path');

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

module.exports = {
  '*.{js,jsx,ts,tsx}': [
    'eslint --cache --fix',
    'prettier --cache --write',
    'npm run lint:style',
    buildEslintCommand,
  ],
};
