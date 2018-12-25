import React, { Component } from 'react';
import './App.css';
import ChannelSection from './components/channels/ChannelSection'
import UserSection from './components/users/UserSection'
import MessageSection from './components/messages/MessageSection'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      channels: [],
      users: [],
      messages: [],
      activeChannel: {}
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

  setUserName = name => {
    let { users } = this.state
    users.push({id: users.length, name})
    this.setState({users})
  }

  addMessage = body => {
    let { messages, users } = this.state
    let createdAt = new Date()
    let author = users.length > 0 ? users[0].name : 'anonymous'
    messages.push({id: messages.length, body, createdAt, author})
    this.setState({messages})
  }

  render() {
    return (
      <div className='app'>
        <div className='nav'>
          <ChannelSection
            channels={this.state.channels}
            activeChannel={this.state.activeChannel}
            addChannel={this.addChannel}
            setChannel={this.setChannel}
          />
          <UserSection
            {...this.state}
            setUserName={this.setUserName}
          />
        </div>
        <MessageSection
          {...this.state}
          addMessage={this.addMessage} />
      </div>
    );
  }
}

export default App;
