export const UtilityStyles = `
  .container {
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .w-100 {
    width: 100%;
  }

  .font-inter {
    font-family: "Inter", sans-serif;
  }

  .grey-accent {
    color: var(--clr-grey);
    font-weight: 300;
  }

  .btn {
    border-radius: 40px;
  }

  .btn:hover {
    transition: all 0.3s ease-in-out;
  }

  .btn-white {
    background: white;
    transition: all 0.3s ease-in-out;
  }

  .btn-white:hover {
    background: black;
    color: white;
  }

  .btn-border {
    background: transparent;
    outline: 1px solid black;
    outline-offset: -1px;
    transition: all 0.3s ease-in-out;
  }

  .btn-border:hover {
    background: black;
    color: white;
  }

  .btn-black {
    background: black;
    color: white;
    padding: 2rem 2.3rem;
    border-radius: 50px;
    transition: all 0.3s ease-in-out;
  }

  .btn-black:hover {
    background: white;
    color: black;
  }

  .btn-yellow {
    background-color: var(--clr-yellow);
    transition: all 0.3s ease-in-out;
  }

  .btn-yellow:hover {
    background: var(--clr-light-black);
    color: var(--clr-yellow);
  }

  .btn-smaller {
    padding: 1rem 2rem;
    font-weight: var(--font-w-bold);
  }
`;