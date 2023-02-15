import { css } from '@emotion/react';
import COLORS from './colors';

const reset = css`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap%27');
  *,
  ::before,
  ::after {
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: theme('borderColor.DEFAULT', 'currentColor');
    font-family: 'Noto Sans KR' !important;
  }
  ::before,
  ::after {
    --tw-content: '';
  }
  html {
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    -moz-tab-size: 4;
    tab-size: 4;
  }
  body {
    margin: 0;
    line-height: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  hr {
    height: 0;
    color: inherit;
    border-top-width: 1px;
  }
  abbr:where([title]) {
    text-decoration: underline dotted;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: inherit;
    font-weight: inherit;
  }
  a {
    color: inherit;
    text-decoration: inherit;
  }
  b,
  strong {
    font-weight: bolder;
  }
  code,
  kbd,
  samp,
  pre {
    font-family: theme(
      'fontFamily.mono',
      ui-monospace,
      SFMono-Regular,
      Menlo,
      Monaco,
      Consolas,
      'Liberation Mono',
      'Courier New',
      monospace
    );
    font-size: 1em;
  }
  small {
    font-size: 80%;
  }
  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  sub {
    bottom: -0.25em;
  }
  sup {
    top: -0.5em;
  }
  table {
    text-indent: 0;
    border-color: inherit;
    border-collapse: collapse;
  }
  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: inherit;
    color: inherit;
    margin: 0;
    padding: 0;
  }
  button,
  select {
    text-transform: none;
  }
  button,
  [type='button'],
  [type='reset'],
  [type='submit'] {
    -webkit-appearance: button;
    background-color: transparent;
    background-image: none;
  }
  :-moz-focusring {
    outline: auto;
  }
  :-moz-ui-invalid {
    box-shadow: none;
  }
  progress {
    vertical-align: baseline;
  }
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    height: auto;
  }
  [type='search'] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
  }
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }
  summary {
    display: list-item;
  }
  blockquote,
  dl,
  dd,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  figure,
  p,
  pre {
    margin: 0;
  }
  fieldset {
    margin: 0;
    padding: 0;
  }
  legend {
    padding: 0;
  }
  ol,
  ul,
  menu {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  textarea {
    resize: vertical;
  }
  input::placeholder,
  textarea::placeholder {
    opacity: 1;
    color: theme('colors.gray.400', #9ca3af);
  }
  button,
  [role='button'] {
    cursor: pointer;
  }
  :disabled {
    cursor: default;
  }
  img,
  svg,
  video,
  canvas,
  audio,
  iframe,
  embed,
  img,
  video {
    max-width: 100%;
    height: auto;
  }
  [hidden] {
    display: none;
  }

  /* Input Focus 색상 */
  input[type='text'],
  input[type='password'],
  input[type='email'],
  input[type='number'],
  input[type='tel'],
  input[type='url'],
  input[type='search'],
  input[type='date'],
  input[type='month'],
  input[type='week'],
  input[type='time'],
  input[type='datetime'],
  input[type='datetime-local'],
  input[type='color'],
  textarea,
  select {
    &:focus {
      outline: none;
      border: 2px solid ${COLORS.violetB400};
      transition: 100ms ease-in-out;
    }
  }

  /* Input Placeholder 색상 */
  input[type='text'],
  input[type='password'],
  input[type='email'],
  input[type='number'],
  input[type='tel'],
  input[type='url'],
  input[type='search'],
  input[type='date'],
  input[type='month'],
  input[type='week'],
  input[type='time'],
  input[type='datetime'],
  input[type='datetime-local'],
  input[type='color'],
  textarea,
  select {
    &::placeholder {
      color: ${COLORS.gray300};
    }
  }

  /* 이미지 드래그 잔상방지 추가 */
  img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
  }
`;

export default reset;
