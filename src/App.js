import React, { Component } from 'react';
import './App.css';
import ChannelSection from './components/channels/ChannelSection'
import UserSection from './components/users/UserSection'
import MessageSection from './components/messages/MessageSection'
import Socket from './socket'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      channels: [],
      users: [],
      messages: [],
      activeChannel: {},
      connected: false
    }
  }

  componentDidMount() {
    let socket = this.socket = new Socket()
    socket.on('connect', this.onConnect)
    socket.on('disconnect', this.onDisconnect)
    socket.on('channel add', this.onAddChannel)
    socket.on('user add', this.onAddUser)
    socket.on('user edit', this.onEditUser)
    socket.on('user remove', this.onRemoveUser)
    socket.on('message add', this.onAddMessage)
  }

  onAddMessage = message => {
    let { messages } = this.state
     messages.push(message)
     this.setState({ messages })
  }

  onRemoveUser = removeUser => {
    let { users } = this.state
    users = users.filter(user => user.id !== removeUser.id)
    this.setState({ users })  
  }

  onAddUser = (user) => {
    let { users } = this.state
    users.push(user)
    this.setState({ users })
  }

  onEditUser = (editUser) => {
    let { users } = this.state
    users = users.map(user => {
      if (editUser.id === user.id) {
        return editUser
      }
      return user
    })
    this.setState({ users })
  }

  onConnect = () => {
    this.setState({ connected: true })
    this.socket.emit('channel subscribe')
    this.socket.emit('user subscribe')
  }

  onDisconnect = () => {
    this.setState({ connected: false })
  }
 
  onAddChannel = channel => {
    let { channels } = this.state
    channels.push({ name: channel.name, id: channels.length })
    this.setState({ channels })
  }

  addChannel = name => {
    this.socket.emit('channel add', { name })
  }

  setChannel = activeChannel => {
    this.setState({activeChannel})
    this.socket.emit('message unsubscribe')
    this.setState({ messages: [] })
    this.socket.emit('message subscribe', { channelId: activeChannel.id })
  }

  setUserName = name => {
    let { users } = this.state
    users.push({id: users.length, name})
    this.setState({users})
  }

  addMessage = body => {
    let { activeChannel } = this.state
    this.socket.emit('message add', { channelId: activeChannel.id, body })
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
