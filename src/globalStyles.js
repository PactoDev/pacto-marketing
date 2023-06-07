import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    height: 100%;
  }

  body {
    // display: flex;
    height: 100%;
    font-family: "ABC Gravity Expanded", ABC Gravity Expanded, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    line-height: 1rem;
    letter-spacing: 0px;
    word-spacing: 0px;

    &.no-scroll {
      overflow-y: hidden;
    }
  }

  #root {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-height: 100%;
    height: 100%;
    width: 100%;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  p, ul, ol, pre, table, blockquote {
    margin-top: 0rem;
    margin-bottom: 1.75rem;
  }

  ul ul, ol ol, ul ol, ol ul {
    margin-top: 0rem;
    margin-bottom: 0rem;
  }

  ul {
    list-style-type: none;

    li {
      display: inline;
      margin: 0 8px;
    }
  }

`;
export default GlobalStyle;
