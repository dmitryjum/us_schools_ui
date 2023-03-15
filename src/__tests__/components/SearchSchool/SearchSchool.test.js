import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../../../reducers'
import SearchSchool from './SearchSchool';

const mockStore = configureStore([]);

describe('SearchSchool component', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      user: {
        data: {
          isAuthenticated: true // Set isAuthenticated to true for testing purposes
        }
      }
    });

    component = render(
      <Provider store={store}>
        <SearchSchool />
      </Provider>
    );
  });

  it('should render without errors', () => {
    expect(component).toMatchSnapshot();
  });

  it('should dispatch the search action when the Search button is clicked', () => {
    const searchButton = component.getByText('Search');
    fireEvent.click(searchButton);

    expect(store.getActions()).toEqual([{ type: 'SEARCH', payload: { term: '' } }]);
  });

  it('should not render the New School button if the user is not authenticated', () => {
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
