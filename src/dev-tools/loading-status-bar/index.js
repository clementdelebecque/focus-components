import React, {Component, PropTypes} from 'react';
import requestStore from 'focus-core/network/built-in-store';
import LoadingStatus from './loading-status';


class LoadingStatusWrapper extends Component{
  componentWillMount() {
      requestStore.addUpdateRequestListener(this._handleRequestsUpdate);
      requestStore.addClearRequestsListener(this._handleClearRequests);
  }
  componentWillUnmount(){
      requestStore.removeUpdateRequestListener(this._handleRequestsUpdate);
      requestStore.removeClearRequestsListener(this._handleClearRequests);
  }
  getInitialState(){
    return {
      total: 0,
      pending: 0
    }
  }
  _getStateFromStore(){
      return requestStore.getRequests();
  }
  _handleRequestsUpdate(){
      this.setState(this._getStateFromStore());
  }
  _handleClearRequests(){
      this.setState({requests: {}});
  }
  render(){
    const {total, pending} = this.state;
    const isLoading = (+((total - pending)/total)*100) < 100;
    return isLoading ? <LoadingStatus /> : null;
  }
}

export default LoadingStatusWrapper;
