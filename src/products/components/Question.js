import React, {Component, PropTypes} from 'react';
import '../Products.scss';

const SEQ = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
export default class Question extends Component {
  static propTypes = {
    question : PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    value: PropTypes.bool,
    onChange: PropTypes.func,
  }

  constructor(props) {
    super(props);
  }

  onChange(value) {
    this.props.onChange && this.props.onChange(value);
  }

  getSeq(index) {
    let seq = '';
    let remain = index % 26;
    let bits = index;
    while (parseInt(bits/26) !== 0) {
      bits = parseInt(bits / 26);
      seq = SEQ[parseInt(bits % 26)] + seq;
    }
    seq += SEQ[remain];
    return seq;
  }

  render() {
    let {index, question, value} = this.props;
    return (
      <div className="pro-introduced public-subsidy ">
        <div className="product-con notice" style={{borderBottom: '2px solid #cacaca'}}>
          <p>{this.getSeq(index)}) {question}</p>
          <div className="con-box">
            <div className="scheme-cover-gaozhi gaozhi-sf">
              <label className={value? '' : 'active'} onClick={()=>this.onChange(false)}><input name="cover-1" type="radio" value="0"/><span>否</span></label>
              <label className={value? 'active' : ''} onClick={()=>this.onChange(true)}><input name="cover-1" type="radio" value="1"/><span>是</span></label>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
