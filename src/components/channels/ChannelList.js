import React from 'react'
import PropTypes from 'prop-types'
import Channel from './Channel'

class ChannelList extends React.Component {
  render() {
    const { channels, setChannel, activeChannel } = this.props
    return (
      <ul>
        {channels.map(chan => <Channel key={chan.id} channel={chan} setChannel={setChannel} activeChannel={activeChannel} />)}
      </ul>
    )
  }
}

ChannelList.propTypes = {
  channels: PropTypes.array.isRequired,
  setChannel: PropTypes.func.isRequired,
  activeChannel: PropTypes.object
}

export default ChannelList
