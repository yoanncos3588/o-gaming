import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

Enzyme.configure({ adapter: new Adapter() });

import { describe, expect, vi } from 'vitest';
import { shallow } from 'enzyme';

import Game from './Game';

const mockUsedNavigate = vi.fn();
const mockBrowserRouter = vi.fn();
const mockUseParams = vi.fn();
const mockUseDispatch = vi.fn();

vi.mock('react-router-dom', () => ({
    ...vi.importActual('react-router-dom'),
    useNavigate: () => mockUsedNavigate,
    BrowserRouter: () => mockBrowserRouter,
    useParams: () => mockUseParams,
}));

vi.mock('react-redux', () => ({
    ...vi.importActual('react-redux'),
    useDispatch: () => mockUseDispatch,
}));

describe('test component Game', () => {
    const wrapper = shallow(<Game />);
    wrapper.setState({ game: { id: 2 } });
    expect(wrapper.state('game')).to.equal(null);
});
