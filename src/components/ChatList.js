import React, { PureComponent } from 'react'

export default class ChatList extends PureComponent {
  render() {
    const { messages } = this.props
    return (
      <div>
        {
          messages.map((message, index) => (
            <div key={`message_${index}`}>
              <h6>{message.user.name}</h6>
              {message.gif
                ? <img src={message.gif} alt={`message_gif_${index}`} />
                : <p className={"message-text"}>{message.text}</p>
              }
            </div>
          ))
        }
      </div>
    )
  }
}