import axios from 'axios'
import { GIPHY_API_KEY } from '../secret'

export const searchGiphy = (searchText) => (
  axios.get(`http://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${searchText}`)
)