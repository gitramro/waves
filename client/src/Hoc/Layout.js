import React, { Component } from 'react';

import Header from '../Components/Header_Footer/Header';
import Footer from '../Components/Header_Footer/Footer';

import { connect } from 'react-redux';
import { getSiteData } from '../Actions/Site_Actions';

class Layout extends Component {


    componentDidMount() {
        if (Object.keys(this.props.site).length === 0) {
            console.log(this.props.site)
            this.props.dispatch(getSiteData());
        }
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="page_container">
                    {this.props.children}
                </div>
                <Footer data={this.props.site}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        site: state.site
    }
}

export default connect(mapStateToProps)(Layout);