import React, { Component } from 'react'

export default class GiphySelection extends Component {
  render() {
    const { gifs, sendGif } = this.props
    return (
      <div>
        {
          gifs.map((gif, index) => (
            <img key={`gif_${index}`} src={gif} alt={`gif_${index}`} onClick={() => { sendGif(gif) }} />
          ))
        }
      </div>
    )
  }
}