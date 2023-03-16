import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../../../reducers'
import SearchSchool from '../../../components/SearchSchool';

// const mockStore = configureStore([]);
const userState = {
  data: {
    isAuthenticated: false
  }
}

const store = createStore(
  rootReducer,
  {user: userState}
);

const renderWithRedux = (component) => {
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  )
}

describe('SearchSchool component', () => {
  // let store;
  // let component;

  // beforeEach(() => {
  //   store = mockStore({
  //     user: {
  //       data: {
  //         isAuthenticated: true // Set isAuthenticated to true for testing purposes
  //       }
  //     }
  //   });

  //   component = render(
  //     <Provider store={store}>
  //       <SearchSchool />
  //     </Provider>
  //   );
  // });

  it('should render all the components', () => {
    act(() => {
      renderWithRedux(<SearchSchool />);
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
