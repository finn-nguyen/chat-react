import React, { Component } from 'react';
import './App.css';
import ChannelSection from './components/channels/ChannelSection'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      channels: [],
      activeChannel: ''
    }
  }

  addChannel = name => {
    let { channels } = this.state
    channels.push({id: channels.length, name})
    this.setState({channels})
  }

  setChannel = activeChannel => {
    this.setState({activeChannel})
  }

  render() {
    return (
      <ChannelSection
        channels={this.state.channels}
        addChannel={this.addChannel}
        setChannel={this.setChannel}
      />
    );
  }
}

export default App;
