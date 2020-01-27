import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem'

// connect enzyme to the react app 
configure({adapter: new Adapter()});

// describe and it are functions from jest 
describe('<NavigationItems />', () => {
    it('should render two <NavigationItems/> elements if not authenicated', ()=> {
        const wrapper = shallow(<NavigationItems />);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
});