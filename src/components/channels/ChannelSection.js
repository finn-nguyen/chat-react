import React from 'react'
import PropTypes from 'prop-types'
import ChannelForm from './ChannelForm'
import ChannelList from './ChannelList'

class ChannelSection extends React.Component {
  render() {
    return (
      <div>
        <ChannelList {...this.props} />
        <ChannelForm {...this.props} />
      </div>
    )
  }
}

ChannelSection.propTypes = {
  channels: PropTypes.array.isRequired,
  setChannel: PropTypes.func.isRequired,
  addChannel: PropTypes.func.isRequired
}

export default ChannelSection
