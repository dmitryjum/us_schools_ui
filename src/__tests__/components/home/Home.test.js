import { render, screen } from '@testing-library/react';
import TopTwentyKeys from '../../components/topTwentyKeys';
describe("Home component", () => {
  test('renders the landing page', () => {
    render(<topTwentyKeys />);
  });
})