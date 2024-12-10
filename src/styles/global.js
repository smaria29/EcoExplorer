export const GlobalStyles = `
  :root {
    --clr-black: #000;
    --clr-light-black: #121212;
    --clr-lighter-black: rgba(14, 14, 14, 0.8);
    --clr-yellow: #ccff00;
    --clr-grey: #a7a7a7;

    --font-huge: 6.4rem;
    --font-xxlarge: 4.8rem;
    --font-xlarge: 3.6rem;
    --font-kindof-large: 3.2rem;
    --font-large: 2.4rem;
    --font-w-bold: 500;
  }

  html {
    height: 100%;
    font-size: 62.5%;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: "Sora", sans-serif;
    font-size: 1.6rem;
    color: var(--clr-light-black);
    height: 100%;
  }

  h1, h2, h3, h4, h5 {
    padding: 0;
    margin: 0;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  img {
    display: block;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  h1 { font-size: var(--font-huge); }
  h2 { font-size: var(--font-xxlarge); }
  h3 { font-size: var(--font-xlarge); }
  h4 { font-size: var(--font-kindof-large); }
  h5 {
    font-size: inherit;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding-block: 1rem;
  }

  p {
    margin-top: 0;
  }

  @media only screen and (max-width: 500px) {
    :root {
      --font-huge: 4.4rem;
      --font-xxlarge: 3.8rem;
      --font-xlarge: 2.8rem;
      --font-kindof-large: 2.7rem;
      --font-large: 2rem;
    }
  }
`;