import { connect } from 'react-redux';

import App from './App';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    fetchAccounts: dispatch.accounts.fetchAccounts,
});

export default 
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App);           