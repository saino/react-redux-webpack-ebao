import React, {Component} from 'react';
import { browserHistory } from 'react-router';

import '../Login.scss'

import config from '../../../config';

import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
const {Toast, Dialog} = WeUI;

export default class LoginView extends Component {
  constructor(props) {
    super(props);
    this.code = this.props.location.query.code;
    this.state = {
      username: '',
      password: '',
      dialog: {
        title: null,
        message: null,
        show: false,
      }
    }
  }

  componentWillMount() {
    // if (this.props.agent) {
    //   browserHistory.replace('/products');
    // } else if (this.props.openid) {
    //   this.props.actions.fetchAgent(this.props.openid, (error, agent) => {
    //     if(error) {
    //       this.showDialog('获取用户数据失败');
    //       return;
    //     }
    //     if(agent) {
    //       browserHistory.replace('/products');
    //     }
    //   })
    // } else if (this.code) {
    //   this.props.actions.fetchOpenid(this.code, (err, openid) => {
    //     if(err) {
    //       this.showDialog('获取微信数据失败');
    //       return;
    //     }
    //     this.props.actions.fetchAgent(openid, (error, agent) => {
    //       if(error) {
    //         this.showDialog('获取用户数据失败');
    //         return;
    //       }
    //       if(agent) {
    //         browserHistory.replace('/products');
    //       }
    //     })
    //   });
    // } else {
    //   window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ config.wxappid +'&redirect_uri='+ window.location.href +'&response_type=code&scope=snsapi_base#wechat_redirect';
    // }
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

  onUsernameChange(event){
    this.setState({
      username: event.target.value
    });
  }

  onClickLogin(event){
    event.preventDefault();
    event.stopPropagation();
    console.log("点击了登录"+this.state.username + "  " + this.state.password);
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
        <div className="login ">
          <div className="userName"><div className="loginUser">用户名：</div><input type="text" value={this.state.username} onChange={this.onUsernameChange.bind(this)}/></div>
          <div className="passWord"> <div className="loginPass">密&nbsp;&nbsp;&nbsp;码：</div><input type="password" value={this.state.password} onChange={e=>this.setState({password:e.target.value})}/></div>
          <div className="tologin" onClick={this.onClickLogin.bind(this)}> 登录 </div>
        </div>
      </div>
    )
  }
}
