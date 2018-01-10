import React from 'react';
import Title from './title.js'
import Main from '../containers/main/index'
import Footer from './footer.js'

import * as Actions from '../actions/index'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import '../style/stylesheet.css';

const App = ({state, actions}) => {
    return (
      <div className="App">
          <Title />
          <Main state={state} actions={actions} />
          <Footer />
      </div>
    );
  }

const mapStateToProps = state => ({
    state: state
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
