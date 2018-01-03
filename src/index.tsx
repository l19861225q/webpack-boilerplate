/**
 * Index
 *
 * @Author: Liu Qian <qianliu>
 * @Email:  112486391@qq.com
 */

import * as React from 'react'
import { render } from 'react-dom'

interface IAppProps {
  content: string
}

class App extends React.Component<IAppProps> {
  public render() {
    return this.props.content
  }
}

render(
  <App content="App" />,
  document.querySelector('main')
)
