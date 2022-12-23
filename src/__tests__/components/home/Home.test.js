import { render, screen } from '@testing-library/react';
import Home from '../../components/home';
describe("Home component", () => {
  test('renders the landing page', () => {
    render(<Home />);
  });
})