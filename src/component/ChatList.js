import React, { PureComponent } from 'react'

export default class ChatList extends PureComponent {
  render() {
    const { messages } = this.props
    return (
      <div>
        {
          messages.map((message) => (
            <div>
              <h6>{message.user.name}</h6>
              <p>{message.text}</p>
            </div>
          ))
        }
      </div>
    )
  }
}