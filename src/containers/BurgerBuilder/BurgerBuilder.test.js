import { BurgerBuilder } from './BurgerBuilder';

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BuilderControls from '../../components/Burger/BuildControls/BuildControls'

// connect enzyme to the react app 
configure({adapter: new Adapter()});

describe('<BurgerBuilder />', ()=>{
    let wrapper;
    
    beforeEach(()=> {
        wrapper = shallow(<BurgerBuilder onInitIngredients={()=>{}}/>);    // as we render <BurgerBuilder/> , we have to import React
    });                                                                    // we have to set onInitInredients to a empty function because it is trigger in ComponentDidMount 
    it('should render <BuilderControls /> when receiving ingredients', ()=> {
        wrapper.setProps({ings: {salad: 0}});
        expect(wrapper.find(BuilderControls)).toHaveLength(1);
    });
});
