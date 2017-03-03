import React, {Component} from 'react';
import { browserHistory } from 'react-router';

import '../Result.scss'

import config from '../../../config';

import WeUI,{ Msg, Footer, FooterLinks, FooterLink, FooterText} from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
const {Toast, Dialog} = WeUI;

const SuccessFooter = ()=>(
  <Footer>
    <FooterLinks>
      <FooterLink href="#">Footer Link</FooterLink>
    </FooterLinks>
    <FooterText>
      Copyright © 2008-2016 weui.io
    </FooterText>
  </Footer>
)

export default class ResultView extends Component {
  constructor(props) {
    super(props);
    this.code = this.props.location.query.code;
    this.state = {
      isSuccess : this.props.params.issuccess=="true" ? "success" : "warn",
      title:this.props.params.issuccess=="true" ? "成功" : "失败",
      description:this.props.params.issuccess=="true" ? "发送成功" : "发送失败",
      username: '',
      password: '',
      dialog: {
        title: null,
        message: null,
        show: false,
      }
    }
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

        <Msg
          type={this.state.isSuccess}
          title={this.state.title}
          description={this.state.description}
          buttons={[{
            type: 'primary',
            label: 'Ok',
            onClick: this.props.history ? this.props.history.goBack : false
          }, {
            type: 'default',
            label: 'Cancel',
            onClick: this.props.history ? this.props.history.goBack : false
          }]}
          footer={SuccessFooter}
        />
      </div>
    )
  }
}
