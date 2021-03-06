import React, {Component} from 'react';
import { browserHistory } from 'react-router';

import products from '../../../products';

import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
const {Toast, Dialog} = WeUI;

export default class ProposalView extends Component {
  constructor(props) {
    super(props);
    this.encryptedUserData = this.props.location.query.encryptedUserData;
    this.productCode = this.props.params.productCode;
    this.details = products[this.productCode].details;
    this.state = {
      dialog: {
        title: null,
        message: null,
        show: false,
      }
    }
  }

  componentWillMount() {

  }

  showDialog(message, title='错误') {
    this.setState({
      dialog : {
        title,
        message,
        show: true,
      }
    });
  }

  hideDialog() {
    this.setState({
      dialog : {
        show: false,
      }
    });
  }

  render() {
    let Details = this.details;
    const buttons = [
      {
        label: 'Ok',
        onClick: this.hideDialog.bind(this),
      }
    ];
    return (
      <div style={{height:'100%'}}>
        <Toast icon="loading" show={this.props.loading}>Loading...</Toast>
        <Dialog title={this.state.dialog.title} buttons={buttons} show={this.state.dialog.show}>
          {this.state.dialog.message}
        </Dialog>
        <Details {...this.props} showDialog={this.showDialog.bind(this)} encryptedUserData={this.encryptedUserData}/>
      </div>
    )
  }
}
