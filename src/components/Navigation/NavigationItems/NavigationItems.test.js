import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem'

// connect enzyme to the react app 
configure({adapter: new Adapter()});

// describe and it are functions from jest 
describe('<NavigationItems />', () => {
    let wrapper;

    beforeEach(()=>{
        wrapper = shallow(<NavigationItems />);
    });

    it('should render two <NavigationItems/> elements if not authenicated', ()=> {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItems/> elements if authenicated', ()=> {
        // wrapper = shallow(<NavigationItems isAuthenticated/>);
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should render three <NavigationItems/> elements if authenicated', ()=> {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true);
    });
});