import React, { Component } from 'react';
import './App.css';
import { subscribeToGroupChat, sendMessage } from './utils/chatSocket'


class App extends Component {
  state = {
    inputMessage: '',
    user: {
      name: 'test_user_1'
    }
  }

  componentDidMount() {
    subscribeToGroupChat(
      this.state.user.name,
      (message) => {
        console.log('testing')
        console.log(message.user.name, ' : ', message.text)
      }
    )
  }

  componentWillUnmount() {

  }

  _sendMessage = (e) => {
    e.preventDefault()
    const { user, inputMessage } = this.state
    if (inputMessage) {
      sendMessage({
        user: user,
        text: inputMessage
      })
      this.setState({ inputMessage: '' })
    }
  }

  _handleInputChange = (e) => {
    e.preventDefault()
    this.setState({ inputMessage: e.target.value })
  }

  render() {
    const { inputMessage } = this.state
    return (
      <div >
        <form onSubmit={this._sendMessage}>
          <input
            type='text'
            value={inputMessage}
            onChange={this._handleInputChange} />
          <input type='submit' />
        </form>
      </div>
    );
  }
}

export default App;
