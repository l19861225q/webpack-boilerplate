/**
 * Index
 *
 * @Author: Liu Qian <qianliu>
 * @Email:  112486391@qq.com
 */

import React, { Component } from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'

class App extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired
  }

  render () {
    return this.props.content
  }
}

render(
  <App content="App" />,
  document.querySelector('main')
)
