import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';

import { HelloWorld } from '../HelloWorld';

const defaultProps = {
  name: 'copain',
};

function mount(overrides = {}) {
  const props = { ...defaultProps, ...overrides };
  const wrapper = <HelloWorld {...props} />;

  return wrapper;
}

describe('HelloWorld', () => {
  it('should render the name', () => {
    const name = 'Copinet';
    const { getByRole } = render(mount({ name }));

    expect(getByRole('heading', { level: 2 })).toHaveTextContent(
      `Salut ${name}`
    );
  });

  describe('when clicking on the button', () => {
    it('should toggle enabled value', () => {
      const { getByRole } = render(mount());
      const button = getByRole('button');
      expect(button).toHaveTextContent('false');

      fireEvent.click(button);

      expect(button).toHaveTextContent('true');
    });
  });
});
