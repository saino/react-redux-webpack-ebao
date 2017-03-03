import React, {Component} from 'react';
import { browserHistory } from 'react-router'

export default class HomeView extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    browserHistory.push('/login');
  }

  render() {
    return (
      <div>
        <h4>Welcome!</h4>
      </div>
    )
  }
}
