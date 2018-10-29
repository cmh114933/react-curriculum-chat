import React, { Component } from 'react'

import ChatList from '../components/ChatList'
import { sendPrivateMessage } from '../utils/chatSocket'

export default class Home extends Component {
  state = {
    inputMessage: ""
  }

  _handleInputChange = (e) => {
    e.preventDefault()
    this.setState({ inputMessage: e.target.value })
  }

  _sendMessage = (e) => {
    e.preventDefault()
    const { user, recipientName } = this.props
    const { inputMessage } = this.state
    if (inputMessage) {
      sendPrivateMessage({
        user: user,
        text: inputMessage,
        recipientName: recipientName
      })
      this.setState({ inputMessage: '' })
    }
  }


  render() {
    const { user: { name }, messages, recipientName } = this.props
    const { inputMessage } = this.state
    return (
      <div>
        {name && <h3>You are {name}, and you are are talking with {recipientName}</h3>}
        <ChatList messages={messages} />
        <form onSubmit={this._sendMessage}>
          <input
            type='text'
            value={inputMessage}
            onChange={this._handleInputChange} />
          <input type='submit' />
        </form>
      </div>
    )
  }
}