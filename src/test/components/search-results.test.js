import { render } from '@testing-library/react';
import SearchResults from 'components/search-results';

import Router from 'next/router';

const mockedRouter = { push: () => {}, prefetch: () => {} };
Router.router = mockedRouter;

describe('Components::SearchResults', () => {
  let props;

  beforeEach(() => {
    props = {
      lang: 'lang',
      total_count: 2,
      items: [{
        id: 1,
        name: 'a',
        description: 'a',
        stargazers_count: 12,
        full_name: 'a/a'
      }, {
        id: 2,
        name: 'a',
        description: 'a',
        stargazers_count: 15,
        full_name: 'b/b'
      }]
    };
  });

  function renderDoc() {
    return render(<SearchResults items={props.items} totalCount={props.total_count} />);
  }

  it('renders all items', () => {
    const { getByTestId } = renderDoc();
    expect(getByTestId('repos').children.length).toBe(props.items.length);
  });
});
