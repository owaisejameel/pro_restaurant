import React from 'react';
import NetInfo from '@react-native-community/netinfo';

// This function takes a component...
function networkHOC() {
  return (WrappedComponent) =>
    // ...and returns another component...
    class extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          isConnected: true,
        };
      }

      componentDidMount() {
        this._unsubscribe = NetInfo.addEventListener((state) => {
          this.handleConnectivityChange(state.isConnected);
          console.log('Connection type', state.type);
          console.log('Is connected?', state.isConnected);
        });
      }

      componentWillUnmount() {
        this._unsubscribe();
      }

      handleConnectivityChange = (isConnected) => {
        this.setState({isConnected});
      };

      render() {
        // ... and renders the wrapped component with the fresh data!
        // Notice that we pass through any additional props
        return (
          <WrappedComponent
            isConnected={this.state.isConnected}
            {...this.props}
          />
        );
      }
    };
}

export default networkHOC;
