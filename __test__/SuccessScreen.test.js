import renderer from "react-test-renderer";
import SuccessScreen from '../screens/SuccessScreen';


describe('SuccessScreen', () => {
  it('SuccessScreen renders correctly', () => {
    const mockRoute = {params: {username: 'test'}};
    const mockNavigation = {navigate: jest.fn()};
    const tree = renderer.create(<SuccessScreen route={mockRoute} navigation={mockNavigation}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
