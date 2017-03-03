import React, {Component} from 'react';
import { browserHistory } from 'react-router';

import products from '../../../products';
import ProductCard from './ProductCard';

import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
const {Toast, Dialog} = WeUI;

export default class ProductsView extends Component {
  constructor(props) {
    super(props);
    this.defaultSearchCondition = {
      encryptedUserData: this.props.location.query.encryptedUserData,
      searchWords: "",
      saleTypeIds: [],
      examPremOrder: null,
      rightIds: [],
      companyIds: [],
      sortOption: 2,
      startPos: 0,
      pageSize: 5,
    };
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

  gotoProposal(code) {
    let url = '/proposal/' + code;
    browserHistory.push(url);
  }

  render() {
    const buttons = [
      {
        label: '确定',
        onClick: this.hideDialog.bind(this),
      }
    ];
    return (
      <div style={{height:'100%'}}>
        <Toast icon="loading" show={this.props.loading}>Loading...</Toast>
        <Dialog title={this.state.dialog.title} buttons={buttons} show={this.state.dialog.show}>
          {this.state.dialog.message}
        </Dialog>
        <div>
          {Object.entries(products).map(([code, product])=><ProductCard key={code} img={product.productImg} onClick={()=>this.gotoProposal(code)}/>)}
        </div>
      </div>
    )
  }
}
