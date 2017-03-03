import React, {Component, PropTypes} from 'react';
import '../Products.scss';

export default class Picker extends Component {
  static propTypes = {
    open: PropTypes.bool,
    options: PropTypes.array,
    onRequestClose: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
  }

  constructor(props) {
    super(props);
  }

  onChange(value) {
    this.props.onChange && this.props.onChange(value);
    this.props.onRequestClose && this.props.onRequestClose();
  }

  render() {
    let {open, options, value} = this.props;
    let optionItems = [];
    if(options) {
      options.map((option,index)=>
          optionItems.push(<li key={index} style={{backgroundColor:option.value===value? '#87CEFA' : 'white'}} onClick={()=>this.onChange(option.value)}>{option.label}</li>)
      );
    }
    return (
      <div className="modle-box transparent js-carls" style={{display:open? 'block' : 'none'}}>
        <div className="shadow-box"></div>
        <div className="choice" style={{zIndex:10000}}>
          <ul>
            {optionItems}
          </ul>
        </div>
      </div>
    )
  }
}
