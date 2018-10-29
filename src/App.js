import React, { Component } from 'react';
import './App.css';
import { subscribeToGroupChat, subscribeToPrivateChats, sendMessage } from './utils/chatSocket'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import UserSideBar from './containers/UserSideBar'
import Home from './pages/Home'
import PrivateChat from './pages/PrivateChat'
class App extends Component {
  state = {
    user: {
      name: null
    },
    messages: [],
    privateMessages: {},
  }

  componentDidMount() {
    subscribeToGroupChat(
      (message) => {
        this.setState({ messages: [...this.state.messages, message] })
      },
      (userName) => {
        this.setState({ user: { name: userName } })
      },

    )
    subscribeToPrivateChats(
      (message) => {
        const privateMessageKey = message.user.name == this.state.user.name ? message.recipientName : message.user.name
        this.setState({
          privateMessages: {
            ...this.state.privateMessages,
            [privateMessageKey]: [
              ...(this.state.privateMessages[privateMessageKey] || []),
              message
            ]
          }
        })
      }
    )
  }

  render() {
    const { messages, user, privateMessages } = this.state
    return (
      <Router>
        <div className={"with-side-bar"}>
          <Route
            exact
            path="/"
            render={() => (<Home messages={messages} user={user} />)} />
          <Route
            exact
            path="/private_chat/:userName"
            render={(props) => {
              const userName = props.match.params.userName
              return (
                <PrivateChat
                  messages={privateMessages[userName] || []}
                  user={user}
                  recipientName={userName} />)
            }} />
          <UserSideBar />
        </div>
      </Router>
    );
  }
}

export default App;
