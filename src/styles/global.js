import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  @import url("https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap");

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    font-family: "Roboto", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a: {
      textDecoration: 'none';
      color: 'inherit';
    }

`;
