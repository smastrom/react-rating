import '@testing-library/jest-dom';

const before = () =>
  beforeEach(() => {
    // @ts-ignore
    window.SVGElement.prototype.getBBox = () => ({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    });
  });

const after = () =>
  afterEach(() => {
    // @ts-ignore
    delete window.SVGElement.prototype.getBBox;
  });

const ID = 'rating';

export { before as beforeEach, after as afterEach, ID };
