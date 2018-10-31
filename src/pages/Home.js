import React, { Component } from 'react'

import ChatList from '../components/ChatList'
import GiphySelection from '../components/GiphySelection'
import { sendMessage } from '../utils/chatSocket'
import { searchGiphy } from '../utils/giphy'

export default class Home extends Component {
  state = {
    inputMessage: "",
    displayGifList: false,
    gifs: [],
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

  _getGifs = (e) => {
    e.preventDefault()
    const { inputMessage } = this.state
    searchGiphy(inputMessage)
      .then((response) => {
        this.setState({ displayGifList: true, gifs: response.data.data.map((gif) => (gif.images.fixed_height_still.url)) })
      }).catch((e) => {
        alert('Could not find gifs for search term ' + inputMessage)
        this.setState({ displayGifList: false, gifs: [] })
      })
  }

  _sendGif = (gif) => {
    const { user } = this.props
    sendMessage({
      user: user,
      gif: gif
    })
    this.setState({ displayGifList: false, gifs: [], inputMessage: "" })
  }

  render() {
    const { user: { name }, messages } = this.props
    const { inputMessage, displayGifList, gifs } = this.state
    return (
      <div className={"main-container"}>
        {name && <h3>You are {name}</h3>}
        <ChatList messages={messages} />
        {displayGifList && gifs.length && <GiphySelection gifs={gifs} sendGif={this._sendGif} />}
        <form onSubmit={this._sendMessage}>
          <input
            type='text'
            value={inputMessage}
            onChange={this._handleInputChange} />
          <input type='submit' />
          <button onClick={this._getGifs}>GIPHIFY</button>
        </form>
      </div>
    )
  }
}