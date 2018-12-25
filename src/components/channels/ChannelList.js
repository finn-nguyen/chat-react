import React from 'react'
import PropTypes from 'prop-types'
import Channel from './Channel'

class ChannelList extends React.Component {
  render() {
    const { channels, setChannel } = this.props
    return (
      <ul>
        {channels.map(chan => <Channel key={chan.id} channel={chan} setChannel={setChannel} />)}
      </ul>
    )
  }
}

ChannelList.propTypes = {
  channels: PropTypes.array.isRequired,
  setChannel: PropTypes.func.isRequired
}

export default ChannelList
