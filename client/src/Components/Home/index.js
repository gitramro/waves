import React, { Component } from 'react';
import HomeSlider from './Home_Slider';
import HomePromotion from './Home_Promotion'

class Home extends Component {
    render() {
        return (
            <div>
                <HomeSlider/>
                <HomePromotion/>
            </div>
        );
    }
}

export default Home;