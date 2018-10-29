import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { subscribeToAvailableUsers } from '../utils/chatSocket'

export default class UserSideBar extends Component {
  state = {
    availableUsers: []
  }

  componentDidMount() {
    subscribeToAvailableUsers(
      (users) => {
        this.setState({ availableUsers: users })
      }
    )
  }

  render() {
    const { availableUsers } = this.state
    return (
      <ul>
        {
          availableUsers.map((userName, index) => (
            <li key={`user_name_${index}`}>
              <Link to={`/private_chat/${userName}`}>{userName}</Link>
            </li>
          ))
        }
      </ul>
    )
  }
}