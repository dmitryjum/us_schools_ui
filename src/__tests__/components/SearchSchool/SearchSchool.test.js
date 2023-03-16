import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../../../reducers'
import SearchSchool from '../../../components/SearchSchool';

const renderWithRedux = (component, store) => {
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  )
}

describe('SearchSchool component', () => {
  it('should render all the components', () => {
    const store = createStore(
      rootReducer,
      {
        user: {
          data: {
            isAuthenticated: false
          }
        }
      }
    );
    act(() => {
      renderWithRedux(<SearchSchool />, store);
    });
    expect(screen.getByText(/Search/i)).toBeInTheDocument();
  });

  xit('should dispatch the search action when the Search button is clicked', () => {
    const searchButton = component.getByText('Search');
    fireEvent.click(searchButton);

    expect(store.getActions()).toEqual([{ type: 'SEARCH', payload: { term: '' } }]);
  });

  xit('should not render the New School button if the user is not authenticated', () => {
    store = mockStore({
      user: {
        data: {
          isAuthenticated: false // Set isAuthenticated to false for testing purposes
        }
      }
    });

    component.rerender(
      <Provider store={store}>
        <SearchSchool />
      </Provider>
    );

    const newSchoolButton = component.queryByText('New School');
    expect(newSchoolButton).not.toBeInTheDocument();
  });
});
