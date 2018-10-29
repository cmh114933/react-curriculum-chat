import React, { Component } from 'react'

import ChatList from '../components/ChatList'
import { sendMessage } from '../utils/chatSocket'

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
    const { user } = this.props
    const { inputMessage } = this.state
    if (inputMessage) {
      sendMessage({
        user: user,
        text: inputMessage
      })
      this.setState({ inputMessage: '' })
    }
  }


  render() {
    const { user: { name }, messages } = this.props
    const { inputMessage } = this.state
    return (
      <div className={"main-container"}>
        {name && <h3>You are {name}</h3>}
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