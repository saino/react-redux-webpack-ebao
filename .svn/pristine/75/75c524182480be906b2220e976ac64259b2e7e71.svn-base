import React, {Component, PropTypes} from 'react';
import '../Products.scss';
import Warning from './Warning';
import Questionnaire from './Questionnaire';
import Picker from '../components/Picker';
import {IdentityCodeValid, getAge, getBirth, getProposalDay, getGender} from '../../common/utils';

const PRODUCT_IDS = [1082104, 1082105];
const PACKAGE_IDS = [9100249, 9100250];
const PH_LA_RELATIONS = [
  {value:10, label:'子女'},
  {value:3, label:'配偶'},
  {value:2, label:'父母'},
]
export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planIndex: 0,
      tabIndex : 0,
      proposalIndex : 0,
      showWarning : false,
      showAudit : false,
      auditPass: false,
      showRelation: false,
      calcPremiumFailed: false,
      proposal0: {
        packageId: PACKAGE_IDS[0],
        insureds: [{
          id : "-1",
          name: '',
          age: 0,
          birthday: '',
          gender: 'M',
          certiCode: '',
          laPhRela: 1, // Self
          mobile: '',
        }],
        proposer: {
          name: '',
          age: 0,
          birthday: '',
          gender: 'M',
          certiType: 1,
          certiCode: '',
          mobile: '',
        },
        mainCoverages: [{
          productId: PRODUCT_IDS[0],
          chargePeriod:{
            periodType:1,
            periodValue:0
          },
          coveragePeriod:{
            periodType: 2,
            periodValue:1
          },
          insuredIds: ["-1"]
        }],
        totalFirstYearPrem: 0
      },
      proposal1: {
        packageId: PACKAGE_IDS[0],
        insureds: [{
          id : "0",
          name: '',
          age: 0,
          birthday: '',
          gender: 'M',
          certiCode: '',
          laPhRela: 0
        }],
        proposer: {
          name: '',
          age: 0,
          birthday: '',
          gender: 'M',
          certiType: 1,
          certiCode: '',
          mobile: '',
        },
        mainCoverages: [{
          productId: PRODUCT_IDS[0],
          chargePeriod:{
            periodType:1,
            periodValue:0
          },
          coveragePeriod:{
            periodType:2,
            periodValue:1
          },
          insuredIds: ["0"]
        }],
        totalFirstYearPrem: 0
      }
    }
  }

  changeProposalIndex(index) {
    this.setState({proposalIndex:index},()=> {
      this.calcPremium();
    })
  }

  onProposal0InsuredNameChange(value) {
    let proposal0 = Object.assign({},this.state.proposal0);
    proposal0.insureds[0].name = value;
    proposal0.proposer.name = value;
    let proposal1 = Object.assign({},this.state.proposal1);
    proposal1.proposer.name = value;
    this.setState({proposal0, proposal1});
  }

  validateProposal0InsuredCertiCode(value) {
    if(!IdentityCodeValid(value)) {
      this.props.showDialog('身份证号码格式错误');
      return false;
    }
    let age = getAge(value);
    let birthday = getBirth(value);
    let gender = getGender(value);
    let proposal0 = Object.assign({},this.state.proposal0);
    proposal0.insureds[0].age = age;
    proposal0.insureds[0].birthday = birthday;
    proposal0.insureds[0].gender = gender;
    proposal0.proposer.age = age;
    proposal0.proposer.gender = gender;
    proposal0.proposer.birthday = birthday;
    let proposal1 = Object.assign({},this.state.proposal1);
    proposal1.proposer.age = age;
    proposal1.proposer.gender = gender;
    proposal1.proposer.birthday = birthday;
    this.setState({proposal0, proposal1}, () => this.calcPremium());
    return true;
  }

  onProposal0InsuredCertiCodeChange(value) {
    let proposal0 = Object.assign({},this.state.proposal0);
    proposal0.insureds[0].certiCode = value;
    proposal0.proposer.certiCode = value;
    let proposal1 = Object.assign({},this.state.proposal1);
    proposal1.proposer.certiCode = value;
    this.setState({proposal0, proposal1});
  }

  onProposal0InsuredMobileChange(value) {
    let proposal0 = Object.assign({},this.state.proposal0);
    proposal0.insureds[0].mobile = value;
    proposal0.proposer.mobile = value;
    let proposal1 = Object.assign({},this.state.proposal1);
    proposal1.proposer.mobile = value;
    this.setState({proposal0, proposal1});
  }

  onProposal1InsuredRelationChange(value) {
    let proposal1 = Object.assign({},this.state.proposal1);
    proposal1.insureds[0].laPhRela = value;
    this.setState({proposal1});
  }

  onProposal1InsuredNameChange(value) {
    let proposal1= Object.assign({},this.state.proposal1);
    proposal1.insureds[0].name = value;
    this.setState({proposal1});
  }

  validateProposal1InsuredCertiCode(value) {
    if(!IdentityCodeValid(value)) {
      this.props.showDialog('身份证号码格式错误');
      return false;
    }
    let age = getAge(value);
    let birthday = getBirth(value);
    let gender = getGender(value);
    let proposal1 = Object.assign({},this.state.proposal1);
    proposal1.insureds[0].age = age;
    proposal1.insureds[0].gender = gender;
    proposal1.insureds[0].birthday = birthday;
    this.setState({proposal1}, () => this.calcPremium());
    return true;
  }

  onProposal1InsuredCertiCodeChange(value) {
    let proposal1 = Object.assign({},this.state.proposal1);
    proposal1.insureds[0].certiCode = value;
    this.setState({proposal1});
  }

  changePlanIndex(index) {
    let proposal0 = Object.assign({},this.state.proposal0);
    proposal0.packageId = PACKAGE_IDS[index];
    proposal0.mainCoverages[0].productId = PRODUCT_IDS[index];
    let proposal1 = Object.assign({},this.state.proposal1);
    proposal1.packageId = PACKAGE_IDS[index];
    proposal1.mainCoverages[0].productId = PRODUCT_IDS[index];
    this.setState({planIndex: index, proposal0, proposal1}, () => {
      this.calcPremium();
    });
  }

  getRelationDesc(rela) {
    for(let relation of PH_LA_RELATIONS) {
      if(relation.value===rela) {
        return relation.label;
      }
    }
    return '请选择与被保人的关系';
  }

  showAudit() {
    console.log('proposal0', this.state.proposal0);
    console.log('proposal1', this.state.proposal1);
    let errorMessages = this.validateProposalInputs();
    if(errorMessages.length > 0) {
      this.props.showDialog(errorMessages);
      return;
    } else {
      this.setState({showAudit: true});
    }
  }

  validateProposalInputs() {
    let errorMessages = [];
    let proposalIndex = this.state.proposalIndex;
    if (proposalIndex === 0) {
      let proposal0 = this.state.proposal0;
      let name = proposal0.insureds[0].name;
      if(!name || name.trim().length===0) {
        errorMessages.push(<h3 key="insuredName">请输入被保人姓名</h3>);
      }
      let certiCode = proposal0.insureds[0].certiCode;
      if(!certiCode || certiCode.trim().length===0) {
        errorMessages.push(<h3 key="insuredCertiCode">请输入身份证号码</h3>);
      } else if (!IdentityCodeValid(certiCode)) {
        errorMessages.push(<h3 key="insuredCertiCode">身份证号码格式错误</h3>);
      }
      let mobile = proposal0.insureds[0].mobile;
      if(!mobile || mobile.trim().length===0) {
        errorMessages.push(<h3 key="insuredMobile">请输入手机号码</h3>);
      }
    } else {
      let proposal1 = this.state.proposal1;
      let name = proposal1.proposer.name;
      if(!name || name.trim().length===0) {
        errorMessages.push(<h3 key="proposerName">请输入投保人姓名</h3>);
      }
      let certiCode = proposal1.proposer.certiCode;
      if(!certiCode || certiCode.trim().length===0) {
        errorMessages.push(<h3 key="proposerCertiCode">请输入身份证号码</h3>);
      } else if (!IdentityCodeValid(certiCode)) {
        errorMessages.push(<h3 key="proposerCertiCode">身份证号码格式错误</h3>);
      }
      let mobile = proposal1.proposer.mobile;
      if(!mobile || mobile.trim().length===0) {
        errorMessages.push(<h3 key="proposerMobile">请输入手机号码</h3>);
      }
      let laPhRela = proposal1.insureds[0].laPhRela;
      if(!laPhRela) {
        errorMessages.push(<h3 key="insuredRela">请选择与被保人的关系</h3>);
      }
      let insuredName = proposal1.insureds[0].name;
      if(!insuredName || insuredName.trim().length===0) {
        errorMessages.push(<h3 key="insuredName">请输入被保人姓名</h3>);
      }
      let insuredCertiCode = proposal1.insureds[0].certiCode;
      if(!insuredCertiCode || insuredCertiCode.trim().length===0) {
        errorMessages.push(<h3 key="insuredName">请输入身份证号码</h3>);
      } else if (!IdentityCodeValid(insuredCertiCode)) {
        errorMessages.push(<h3 key="insuredCertiCode">身份证号码格式错误</h3>);
      }
    }
    return errorMessages;
  }

  calcPremium() {
    let proposalIndex = this.state.proposalIndex;
    if (proposalIndex === 0) {
      let proposal0 = this.state.proposal0;
      if (!IdentityCodeValid(proposal0.insureds[0].certiCode)) {
        return;
      }
      this.props.actions.calcPremium({plan:proposal0}, (err, totalFirstYearPrem) => {
        if (err) {
          this.props.showDialog('计算保费失败');
          this.setState({calcPremiumFailed:true});
          return;
        }
        proposal0.totalFirstYearPrem = totalFirstYearPrem;
        this.setState({proposal0, calcPremiumFailed:false});
      })
    } else {
      let proposal1 = this.state.proposal1;
      if (!IdentityCodeValid(proposal1.insureds[0].certiCode) || !IdentityCodeValid(proposal1.proposer.certiCode)) {
        return;
      }
      this.props.actions.calcPremium({plan:proposal1}, (err, totalFirstYearPrem) => {
        if (err) {
          this.props.showDialog('计算保费失败');
          this.setState({calcPremiumFailed:true});
          return;
        }
        proposal1.totalFirstYearPrem = totalFirstYearPrem;
        this.setState({proposal1, calcPremiumFailed:false});
      })
    }
  }

  validateSave() {
    let errorMessages = this.validateProposalInputs();
    if(errorMessages.length > 0) {
      this.props.showDialog(errorMessages);
      return false;
    }
    if(!this.state.auditPass) {
      this.props.showDialog('请点击审核');
      return false;
    }
    if(this.state.calcPremiumFailed) {
      this.props.showDialog('保费重算中，请再试一次');
      this.calcPremium();
      return false;
    }
    return true;
  }

  saveProposal() {
    if(!this.validateSave()) {
      return;
    }
    let proposalIndex = this.state.proposalIndex;
    let proposal = null;
    if (proposalIndex === 0) {
      proposal = this.state.proposal0;
    } else {
      proposal = this.state.proposal1;
    }
    let proposalRequest = {
      encryptedUserData: this.props.encryptedUserData,
      proposalInfo : proposal,
    }
    this.actions.saveProposal(proposalRequest, (err, proposalId) => {
      if (err) {
        this.props.showDialog('提交订单失败');
        return;
      }
    });
  }

  render() {
    return (
      <section className="details-section">
        <Warning open={this.state.showWarning} onRequestClose={()=>this.setState({showWarning: false})}/>
        <Questionnaire open={!this.state.auditPass && this.state.showAudit} onRequestClose={()=>this.setState({showAudit: false, auditPass: true})}/>
        <Picker open={this.state.showRelation} value={this.state.proposal1.insureds[0].laPhRela} onChange={value=>this.onProposal1InsuredRelationChange(value)} options={PH_LA_RELATIONS} onRequestClose={()=>this.setState({showRelation: false})}/>
        <article id="wrapper" style={{backgroundColor: '#e3e3e8'}} className="details-article">
          <div className="subsidy-ad">
            <div>
              <div className="subsidy-ad-tit">
                <div>
                  <h2>安联臻爱医疗保险</h2>
                  <p></p>
                </div>
              </div>
              <div className="mask-brush">
                <ul className="subsidy-ad-ul">
                  <li>
                    <div>
                      <p>适用人群</p>
                      <p><span>30天-60周岁</span><span>健康人群</span></p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <p>保险期间</p>
                      <p>1年</p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <p>保险费</p>
                      <p>152元起</p>
                    </div>
                  </li>
                </ul>

                <div className="subsidy-ad-safety">
                  <div>
                    <p>保险特点</p>
                    <div className="safety-box">

                      <div className="safety-cen">
                        <div className="sp-icon"><img className="iconfont1" src={require('../assets/iconfont-iphone2.png')}/></div>
                        <div className="caption">
                          <p>住院医疗更安心 </p>
                          <p>年度保额100万</p>
                        </div>
                      </div>

                      <div className="safety-cen">
                        <div className="sp-icon"><img className="iconfont2" src={require('../assets/iconfont-golf2.png')}/></div>
                        <div className="caption">
                          <p>特殊门诊不费心 </p>
                          <p>20万特殊门诊保额</p>
                        </div>
                      </div>

                      <div className="safety-cen">
                        <div className="sp-icon"><img className="iconfont3" src={require('../assets/iconfont-kuaican2.png')}/></div>
                        <div className="caption">
                          <p>低廉保费超贴心 </p>
                          <p>最低不到0.4元/天 </p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="subsidy-con">
            <div className="pro-introduced public-subsidy pt35 pb51">
              <p>产品简介</p>
              <div className="con-box">
                <p>本保险对于被保险人在保险期间内因疾病或意外伤害发生的住院医疗费用、特殊门诊医疗费用、住院前后门急诊医疗费用等给予综合的保障。</p>
              </div>
            </div>
          </div>

          <div className="subsidy-con">
            <div className="public-subsidy pro-introduced pt16">
              <p>保障方案</p>
              <div className="con-box  pb21">
                <div className="scheme-cover" id="proChoose">

                  <label className={this.state.planIndex===0?'active':''} onClick={()=>this.changePlanIndex(0)}><input name="cover" type="radio" value="A"/><span>方案A（无社保）</span></label>

                  <label className={this.state.planIndex===1? 'active':''} onClick={()=>this.changePlanIndex(1)}><input name="cover" type="radio" value="B"/><span>方案B（有社保）</span></label>

                </div>
                <div className="product-box" style={{display:this.state.planIndex===0?'block':'none'}}>
                  <div id="plan" className="product-con">
                    <table id="A">
                      <thead>
                      <tr>
                        <th width="50%">保障内容</th>
                        <th width="50%">保额</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>
                          <p>住院医疗保险金</p>
                        </td>
                        <td rowSpan="2">
                          <p>100万</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>住院前后门急诊医疗保险金</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>特殊门诊医疗保险金</p>
                        </td>
                        <td>
                          <p>20万</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>年度保单限额</p>
                        </td>
                        <td>
                          <p>100万</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>年度免赔额</p>
                        </td>
                        <td>
                          <p>1万</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>赔付比例</p>
                        </td>
                        <td>
                          <p>100%</p>
                        </td>
                      </tr>
                      </tbody>
                    </table>

                  </div>
                </div>
                <div className="product-box" style={{display:this.state.planIndex===1?'block':'none'}}>
                  <div id="plan" className="product-con">
                    <table id="B">
                      <thead>
                      <tr>
                        <th width="50%">保障内容</th>
                        <th width="50%">保额</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>
                          <p>住院医疗保险金</p>
                        </td>
                        <td rowSpan="2">
                          <p>200万</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>住院前后门急诊医疗保险金</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>特殊门诊医疗保险金</p>
                        </td>
                        <td>
                          <p>40万</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>年度保单限额</p>
                        </td>
                        <td>
                          <p>200万</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>年度免赔额</p>
                        </td>
                        <td>
                          <p>1万</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>赔付比例</p>
                        </td>
                        <td>
                          <p>100%</p>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="subsidy-con">
            <div className="public-subsidy pro-introduced pt16">
              <div className="scheme-cover" id="insuranceMode">
                <label className={this.state.proposalIndex===0?'active':''} onClick={()=>this.changeProposalIndex(0)}><input name="cover-tp" type="radio" value="self"/><span>为本人投保</span></label>
                <label className={this.state.proposalIndex===1?'active':''} onClick={()=>this.changeProposalIndex(1)}><input name="cover-tp" type="radio" value="third"/><span>为他人投保</span></label>
              </div>
              <form id="self" style={{display:this.state.proposalIndex===0?'block':'none'}}>
                <div className="pb40">
                  <div className="info-group">
                    <label className="group-hd">被保险人姓名</label>
                    <div className="group-ctr"><input value={this.state.proposal0.insureds[0].name} onChange={e=>this.onProposal0InsuredNameChange(e.target.value)} className="pad" type="text" id="self-bbr" placeholder="请输入被保人姓名" maxLength="25" /></div>
                  </div>
                  <div className="info-group">
                    <label className="group-hd">身份证号码</label>
                    <div className="group-ctr"><input value={this.state.proposal0.insureds[0].certiCode} onBlur={e=>this.validateProposal0InsuredCertiCode(e.target.value)} onChange={e=>this.onProposal0InsuredCertiCodeChange(e.target.value)} className="pad" type="text" id="self-idCard" placeholder="请输入身份证号码" maxLength="18" /></div>
                  </div>
                  <div className="info-group">
                    <label className="group-hd">手机号码</label>
                    <div className="group-ctr"><input value={this.state.proposal0.insureds[0].mobile} onChange={e=>this.onProposal0InsuredMobileChange(e.target.value)} className="pad" type="tel" id="self-mobile" placeholder="请输入手机号码" maxLength="11" /></div>
                  </div>
                  <div className="info-group">
                    <label className="group-hd">健康告知</label>
                    <div className="group-ctr">
                      <input type="text" readOnly={true} disabled={this.state.auditPass} className="pad" name="self-gz" placeholder={this.state.auditPass? '审核通过' : '点击审核'} onClick={()=>this.showAudit()}/>
                        <input type="hidden" name="self-val" value=""/>
                    </div>
                  </div>
                </div>
              </form>

              <form id="third" style={{display:this.state.proposalIndex===1?'block':'none'}}>
                <div className="pb40">
                  <div className="info-group">
                    <label className="group-hd">投保险人姓名</label>
                    <div className="group-ctr"><input value={this.state.proposal1.proposer.name} onChange={e=>this.onProposal0InsuredNameChange(e.target.value)} className="pad" type="text" id="third-tbr" placeholder="请输入投保人姓名" maxLength="25" /></div>
                  </div>
                  <div className="info-group">
                    <label className="group-hd">身份证号码</label>
                    <div className="group-ctr"><input value={this.state.proposal1.proposer.certiCode} onBlur={e=>this.validateProposal0InsuredCertiCode(e.target.value)} onChange={e=>this.onProposal0InsuredCertiCodeChange(e.target.value)} className="pad" type="text" id="third-tbrIdCard" placeholder="请输入身份证号码" maxLength="18" /></div>
                  </div>
                  <div className="info-group">
                    <label className="group-hd">手机号码</label>
                    <div className="group-ctr"><input value={this.state.proposal1.proposer.mobile} onChange={e=>this.onProposal0InsuredMobileChange(e.target.value)} className="pad" type="tel" id="third-tbrMobile" placeholder="请输入手机号码" maxLength="11" /></div>
                  </div>
                  <div className="info-group">
                    <label className="group-hd">与被保人关系</label>
                    <div id="seaRs" className="group-ctr rg-fu">
                      <input onClick={()=>this.setState({showRelation:true})} className="pad" name="rsShow" type="text" placeholder={this.getRelationDesc(this.state.proposal1.insureds[0].laPhRela)} readOnly={true} />
                          <img src={require('../assets/sanjiao-b.png')}/></div>
                  </div>

                  <div className="info-group">
                    <label className="group-hd">被保险人姓名</label>
                    <div className="group-ctr"><input value={this.state.proposal1.insureds[0].name} onChange={e=>this.onProposal1InsuredNameChange(e.target.value)} className="pad" type="text" id="third-bbr" placeholder="请输入被保人姓名" maxLength="25" /></div>
                  </div>
                  <div className="info-group">
                    <label className="group-hd">身份证号码</label>
                    <div className="group-ctr"><input value={this.state.proposal1.insureds[0].certiCode} onBlur={e=>this.validateProposal1InsuredCertiCode(e.target.value)} onChange={e=>this.onProposal1InsuredCertiCodeChange(e.target.value)} className="pad" type="text" id="third-bbrIdCard" placeholder="请输入身份证号码" maxLength="18" /></div>
                  </div>
                  <div className="info-group">
                    <label className="group-hd">健康告知</label>
                    <div className="group-ctr">
                      <input type="text" className="pad" name="third-gz" placeholder={this.state.auditPass? '审核通过' : '点击审核'} readOnly={true} onClick={()=>this.showAudit()}/>
                        <input type="hidden" name="third-val" value=""/>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="subsidy-con">
            <div className="public-subsidy product-box claim-process pt37">
              <ul className="js-product-box">
                <li className={this.state.tabIndex===0?'active':''} onClick={()=>this.setState({tabIndex:0})}>如何获赔</li>
                <li className={this.state.tabIndex===1?'active':''} onClick={()=>this.setState({tabIndex:1})}>投保须知</li>
                <li className={this.state.tabIndex===2?'active':''} onClick={()=>this.setState({tabIndex:2})}>保险条款</li>
                <li className={this.state.tabIndex===3?'active':''} onClick={()=>this.setState({tabIndex:3})}>常见问题</li>
              </ul>
              <div className="claim-con-wrap claimGuid js-claim-con-wrap" style={{display: this.state.tabIndex===0? 'block':'none'}}>
                <div className="claim-box">
                  <div className="claim-left">
                    <span>第1步</span>
                    <span>报案</span>
                  </div>
                  <div className="claim-body">
                    <h4 className="claim-heading">方式一：电话报案</h4>
                    <p className="claim-con">被保险人出险后，拨打<a style={{color:'blue'}} href="tel:400-88-45678">400-88-45678</a>客服电话进行报案，对保单信息、保险事故进行简要说明，客服人员会将安心保险的理赔线下邮寄地址：上海市邮政信箱011-037以短信的形式发送至被保险人手机。</p>
                    <div className="h34"></div>
                    <h4 className="claim-heading">方式二 : 微信报案</h4>
                    <p className="claim-con">被保险人进入安心保险微信公众号，点击下方“快速赔”，选择险种后进入理赔报案页面，在微信平台对值班客服进行出险报案，客服人员录入报案信息。</p>
                    <div className="h34"></div>
                    <h4 className="claim-heading red">温馨提示</h4>
                    <p className="claim-con red">1.若被保险人本次理赔申请金额&lt;=1500元，请按照第2步的要求上传资料。</p>
                    <p className="claim-con red">2.若被保险人本次理赔申请金额&gt;1500元，请按照第2步要求的实物理赔资料邮寄至“上海市邮政信箱011-037”。
                    </p>
                  </div>
                </div>
                <div className="claim-box">
                  <div className="claim-left">
                    <span>第2步</span>
                    <span>上传资料</span>
                  </div>
                  <div className="claim-body">
                    <h4 className="claim-heading">上传资料</h4>
                    <p className="claim-con">被保险人将以下资料的照片通过微信平台上传：</p>
                    <p className="claim-con">①保险金给付申请书； </p>
                    <p className="claim-con">②申请人的法定身份证明；</p>
                    <p className="claim-con">③保险人指定或认可的医院出具的病历资料，包含但不限于门诊病历记录、出入院记录、手术记录、必要的病理检查或其他科学检查检验报告；</p>
                    <p className="claim-con">④医疗费用的原始凭证、医疗费用结算清单、手术费用清单（若发生手术时需提供）；</p>
                    <p className="claim-con">⑤所能提供的与确认保险事故的性质、原因等有关的其他证明和资料；</p>
                    <p className="claim-con">⑥被保险人的银行账户信息。</p>
                  </div>
                </div>
                <div className="claim-box">
                  <div className="claim-left">
                    <span>第3步</span>
                    <span>查勘</span>
                  </div>
                  <div className="claim-body">
                    <h4 className="claim-heading">查验</h4>
                    <p className="claim-con">查勘人员对资料进行审核，如有需要我公司会派相关人员进行现场查勘。</p>
                  </div>
                </div>

                <div className="claim-box">
                  <div className="claim-left last-claim">
                    <span>第4步</span>
                    <span>理赔</span>
                  </div>
                  <div className="claim-body">
                    <h4 className="claim-heading">理赔</h4>
                    <p className="claim-con">理赔资料审核通过后，十个工作日内将赔款支付到指定账户。</p>
                  </div>
                </div>
              </div>
              <div className="product-con notice js-claim-con-wrap" style={{display: this.state.tabIndex===1? 'block':'none'}}>
                <div>
                  <p>1.适用人群：投保人18周岁及以上；被保险人30天至60周岁；</p>
                  <p>2.从事的职业风险等级为1-4类，具体分类见
                    <a href="../static/products/HealthAcc/work.xlsx">职业代码表</a>；</p>
                  <p>3.每人限投保一份，多投无效；</p>
                  <p>4.保险期间：一年；</p>
                  <p>5.缴费方式：趸交；</p>
                  <p>6.被在线投保规则:</p>
                  <p>&nbsp;a. 在线问卷告 “是”则转线下。</p>
                  <p>&nbsp;b．生存受益人必须为本人。</p>
                  <p>&nbsp;c．被保险人与投保人必须为以下之一：本人、配偶、子女、父母；</p>
                  <p>7.本保险自投保人投保支付成功后次日零时起生效。投保人投保后请尽快完成保费支付，未及时支付的订单将在投保当日24时自动失效，需重新点击购买；</p>
                  <p>8.本产品通过互联网在全国范围内销售；</p>
                  <p>9.本产品采用电子保单形式承保，法律效力等同于纸质保单。如果投保人需要纸质保单及发票，请拨打客服电话。若需寄送，邮费将由投保人自行承担；</p>
                  <p>10.温馨提示：安心保险全国统一客服专线 <a style={{color:'blue'}} href="tel:400-88-45678">400-88-45678</a>；</p>
                  <p>11.如实告知：投保人如投保本保险，应依法履行如实告知义务<label style={{color: 'red'}}>（违反如实告知页面）</label>；</p>
                  <p>12.投保本保险前，请投保人认真阅读产品页面展示内容以及《安心综合费用医疗保险（B款）条款》。</p>
                  <div className="details-box">
                    <img src={require('../assets/details-icon.png')}/>
                      <p>违反如实告知的后果</p>
                      <a onClick={()=>this.setState({showWarning:true})}>了解详情 &gt;</a>
                  </div>
                </div>
              </div>

              <div className="product-con general js-claim-con-wrap" style={{display: this.state.tabIndex===2? 'block':'none'}}>
                <dl className="pb43">
                  <dt className="cxt">
                    <h2>安心财产保险有限责任公司</h2>
                    <h2>安心综合医疗保险（B款）条款</h2>
                  </dt>
                  <dt>总则</dt>
                  <dd className="pb34">
                    <p>第一条 本保险合同由保险条款、投保单、保险单、保险凭证以及批单等组成。凡涉及本保险合同的约定，均应采用书面形式。</p>
                    <p>第二条 具有完全民事行为能力的被保险人本人或对被保险人有保险利益的其他人均可作为本保险合同的投保人。</p>
                    <p>第三条 凡出生满三十日至六十周岁（含），享有社会医疗保险或公费医疗保障的人士均可作为本保险合同的被保险人。如属续保，被保险人的年龄最高可至八十周岁（含）。</p>
                    <p>第四条 除另有约定外，本保险合同的保险金的受益人为被保险人本人。</p>
                  </dd>
                  <dt>保险责任</dt>
                  <dd className="pb34">
                    <p>第五条 投保人首次投保或非连续投保本保险时，被保险人因腺样体肥大、疝气或扁桃腺的疾病需要住院治疗或特殊门诊治疗的，自本保险合同生效之日起九十日为等待期；被保险人因其他疾病需要住院治疗或特殊门诊治疗的，自本保险合同生效之日起三十日为等待期。续保或者因意外伤害进行治疗的无等待期。被保险人在等待期内发生的疾病，无论治疗时间与生效之日间隔是否超过等待期，保险人都不承担给付保险金的责任。</p>
                    <p>第六条 在保险期间内，本保险合同的保险责任如下：</p>
                    <p>(一) 住院医疗保险金</p>
                    <p>被保险人因疾病或意外伤害经医院专科医生诊断必须住院治疗，在被保险人已按社会医疗保险或公费医疗有关规定取得医疗费用补偿后，对被保险人住院期间实际支出的合理且必要的住院医疗费用，保险人在扣除本保险合同中约定的免赔额后，在保险金额范围内，按照约定的给付比例、各项费用的年限额、最高给付日数给付住院医疗保险金。</p>
                    <p>在保险期间内，保险人仅对被保险人累计住院一百八十日内发生的住院医疗费用承担保险责任。</p>
                    <p>对等待期后本保险合同到期日前发生的且延续至本保险合同到期日后三十日内的住院治疗，保险人仍然承担给付保险金的责任，且累计给付日数以一百八十日为限，累计给付金额以保险合同中约定的年限额为限。</p>
                    <p>(二)特殊门诊医疗保险金</p>
                    <p>被保险人因疾病或意外伤害在医院进行门诊肾透析、门诊恶性肿瘤电疗、化疗或放疗，保险人按照被保险人治疗发生的合理且必要的特殊门诊医疗费用，在扣除约定的免赔额后，按照约定的给付比例在年限额范围内给付特殊门诊医疗保险金。</p>
                    <p>(三) 住院前后门急诊医疗保险金</p>
                    <p>被保险人因本条（一）项下的保险事故经医院专科医生诊断必须住院治疗，保险人对其在该次住院前七日内（含住院当日）以及出院后三十日内（含出院当日）进行的门急诊治疗发生的合理且必要的门急诊医疗费用，在扣除约定的免赔额后，按照约定的给付比例在年限额范围内给付住院前后门急诊医疗保险金。</p>
                    <p>本保险合同的免赔额、给付比例、保险金额、各项费用的年限额由投保人和保险人在投保时约定，并在保险单中载明。</p>
                    <p>第七条 对于上述各项保险责任，被保险人不论一次或多次在医院进行治疗，保险人均按上述约定给付各项保险金，但各项费用的累计给付日数以不超过各对应项最高给付日数为限，各项费用的累计给付日数达到其对应项最高给付日数时，保险人对被保险人的该项保险责任终止；各项费用的累计给付金额以不超过各对应项的年限额为限，各项费用的累计给付金额达到其对应项的年限额时，保险人对被保险人的该项保险责任终止；累计给付金额以不超过该被保险人的保险金额为限，累计给付金额达到被保险人保险金额时，保险人对该被保险人的保险责任终止。</p>
                    <p>第八条 本保险适用医疗费用补偿原则。若保险事故发生时，被保险人通过任何途径所获得的医疗费用补偿金额总和以其实际支出的医疗费用金额为限。被保险人已经从社会基本医疗保险或其他途径（包括工作单位、保险人在内的任何商业医疗保险）获得相关医疗费用补偿的，保险人仅按照本保险合同约定补偿剩余部分，并以保险金额为限，被保险人不得就已经补偿的费用再次向保险人申请保险金。</p>
                    <p>若被保险人未从社会医疗保险、公费医疗或其他途径（包括工作单位、保险人在内的任何商业保险机构等）取得医疗费用补偿，对被保险人所支出的合理且必要的各项医疗费用，保险人扣除本保险合同中约定的免赔额后，在保险金额、各项费用的年限额、最高给付日数范围内，按照约定的给付比例，再乘以60%给付各项保险金。</p>
                    <p>若被保险人未从社会医疗保险或公费医疗有关规定取得医疗费用补偿，而从其他途径（包括工作单位、保险人在内的任何商业保险机构等）取得补偿的，对被保险人所支出的合理且必要的各项医疗费用，保险人在扣除被保险人从其他途径取得补偿的金额后，就剩余的各项医疗费用，在扣除本保险合同中约定的免赔额后，在保险金额、各项费用的年限额、最高给付日数范围内，按照约定的给付比例给付各项保险金，且给付的各项保险金金额应不超过本保险合同约定范围内的各项医疗费用乘以约定的给付比例后的60%。</p>
                  </dd>
                  <dt>责任免除</dt>
                  <dd className="pb34">
                    <p>第九条 因下列情形之一，造成被保险人支出本保险合同约定的医疗费用的，保险人不承担给付保险金的责任：</p>
                    <p>(一) 投保人对被保险人的故意杀害、故意伤害；</p>
                    <p>(二) 被保险人故意自伤、故意犯罪或者抗拒依法采取的刑事强制措施；</p>
                    <p>(三) 被保险人主动吸食或注射毒品；</p>
                    <p>(四) 被保险人酒后驾驶机动车、无合法有效驾驶证驾驶，或驾驶无有效行驶证的机动车；</p>
                    <p>(五) 被保险人感染艾滋病病毒或患艾滋病期间因疾病导致的；</p>
                    <p>(六) 战争、军事冲突、暴乱或武装叛乱；</p>
                    <p>(七) 核爆炸、核辐射或核污染；</p>
                    <p>(八) 遗传性疾病、先天性畸形、变形和染色体异常；</p>
                    <p>(九) 保险单中特别约定的除外疾病及其并发症；</p>
                    <p>(十) 既往症；</p>
                    <p>(十一) 被保险人在非本保险合同约定的医院就诊发生的医疗费用；</p>
                    <p>(十二) 不孕不育治疗、人工受精、怀孕、分娩（含难产）、流产、堕胎、节育（含绝育）、产前产后检查以及由以上原因引起的并发症；</p>
                    <p>(十三) 精神和行为障碍（依照世界卫生组织《疾病和有关健康问题的国际统计分类》（ICD-10）确定）、性病；</p>
                    <p>(十四) 疗养、矫形、视力矫正手术、美容、非意外事故所致整容手术、非意外事故所牙科疾病治疗及康复；</p>
                    <p>(十五) 从事潜水、跳伞、攀岩、蹦极、驾驶滑翔机或滑翔伞、探险、摔跤、武术比赛、特技表演、赛马、赛车等高风险运动；</p>
                    <p>(十六) 被保险人因预防、康复、保健型或非疾病治疗类项目发生的医疗费用；眼镜、义齿、义眼、义肢、助听器等康复性器具。</p>
                  </dd>
                  <dt>保险金额</dt>
                  <dd className="pb34">
                    <p>第十条 保险金额由投保人与保险人双方约定，并在保险合同中载明。保险金额是保险人承担给付保险金责任的最高限额。</p>
                  </dd>
                  <dt>保险期间</dt>
                  <dd className="pb34">
                    <p>第十一条 本保险合同的保险期间为一年，以保险合同载明的起讫时间为准。</p>
                  </dd>

                  <dt>保险人义务</dt>
                  <dd className="pb34">
                    <p>第十二条 订立保险合同时，采用保险人提供的格式条款的，保险人向投保人提供的投保单应当附格式条款，保险人应当向投保人说明保险合同的内容。对保险合同中免除保险人责任的条款，保险人在订立合同时应当在投保单、保险单或者其他保险凭证上作出足以引起投保人注意的提示，并对该条款的内容以书面或者口头形式向投保人作出明确说明；未作提示或者明确说明的，该条款不产生效力。</p>
                    <p>第十三条 本保险合同成立后，保险人应当及时向投保人签发保险单或其他保险凭证。</p>
                    <p>第十四条 保险人认为被保险人提供的有关索赔的证明和资料不完整的，应当及时一次性通知投保人、被保险人补充提供。</p>
                    <p>第十五条 保险人收到被保险人的给付保险金的请求后，应当在五日内作出是否属于保险责任的核定；情形复杂的，在三十日内作出核定。</p>
                    <p>第十六条 保险人应当将核定结果通知被保险人；对属于保险责任的，在与被保险人达成给付保险金的协议后十日内，履行给付保险金义务。保险合同对给付保险金的期限有约定的，保险人应当按照约定履行给付保险金的义务。保险人依照第十五条约定作出核定后，对不属于保险责任的，应当自作出核定之日起三日内向被保险人发出拒绝给付保险金通知书，并说明理由。</p>
                    <p>第十七条 保险人自收到给付保险金的请求和有关证明、资料之日起六十日内，对其给付的数额不能确定的，应当根据已有证明和资料可以确定的数额先予支付；保险人最终确定给付的数额后，应当支付相应的差额。</p>
                  </dd>

                  <dt>投保人、被保险人义务</dt>
                  <dd className="pb34">
                    <p>第十八条 订立本保险合同时，保险人就被保险人的有关情况提出询问，投保人应当如实告知。</p>
                    <p>投保人故意或者因重大过失未履行前款规定的如实告知义务，足以影响保险人决定是否同意承保或者提高保险费率的，保险人有权解除本保险合同。</p>
                    <p>投保人故意不履行如实告知义务的，保险人对于合同解除前发生的保险事故，不承担给付保险金责任，并不退还保险费。</p>
                    <p>投保人因重大过失未履行如实告知义务，对保险事故的发生有严重影响的，保险人对于合同解除前发生的保险事故，不承担给付保险金的责任，但退还保险费。</p>
                    <p>前款规定的合同解除权，自保险人知道有解除事由之日起，超过三十日不行使而消灭。自合同成立之日起超过二年的，保险人不得解除合同；发生保险事故的，保险人应当承担给付保险金责任。</p>
                    <p>保险人在合同订立时已经知道投保人未如实告知的情况的，保险人不得解除合同；发生保险事故的，保险人应当承担给付保险金责任。</p>
                    <p>第十九条 投保人、被保险人或者保险金受益人自其知道或应当知道保险事故发生之日起十日内通知保险人。否则，投保人或被保险人应承担由于通知迟延致使保险人增加的勘查、检验等项费用。故意或者因重大过失未及时通知，致使保险事故的性质、原因、损失程度等难以确定的，保险人对无法确定的部分，不承担给付保险金责任，但保险人通过其他途径已经及时知道或者应当及时知道保险事故发生的除外。</p>
                    <p>上述约定，不包括因不可抗力而导致的迟延。</p>
                    <p>第二十条 本保险合同的保险费采取一次性交付方式。保险费会随着投保人年龄的增长而上升。</p>
                  </dd>

                  <dt>保险金申请与给付</dt>
                  <dd className="pb34">
                    <p>第二十一条 保险金申请人向保险人申请给付保险金时，应提交以下材料。保险金申请人因特殊原因不能提供以下材料的，应提供其他合法有效的材料。保险金申请人未能提供有关材料，导致保险人无法核实该申请的真实性的，保险人对无法核实部分不承担给付保险金的责任。</p>
                    <p>（一）由被保险人作为申请人填写保险金给付申请书，并凭下列证明和资料向保险人申请保险金：</p>
                    <p>1.保险金给付申请书；</p>
                    <p>2.申请人的法定身份证明； </p>
                    <p>3.医院出具的病历资料，包含但不限于门诊病历记录、出入院记录、手术记录、必要的病理检查或其他科学检查检验报告；</p>
                    <p>4.医疗费用的原始凭证、医疗费用结算清单、手术费用清单（若发生手术时需提供）；</p>
                    <p>5.所能提供的与确认保险事故的性质、原因等有关的其他证明和资料。 </p>
                    <p>（二）若委托他人代为申请保险金，被委托人还应提供以下证明和资料：</p>
                    <p>1.保险金受益人签字的授权委托书、被委托人的有效身份证件等相关证明文件；</p>
                    <p>2.受益人或继承人为未成年人或无民事行为能力人时，由其合法监护人代其申请领取保险金，其合法监护人还必须提供受益人或继承人为未成年人或无民事行为能力人的证明和监护人具有合法监护权的证明。</p>
                    <p>第二十二条 保险金申请人向保险人请求给付保险金的诉讼时效期间为二年，自其知道或者应当知道保险事故发生之日起计算。</p>
                  </dd>

                  <dt>续保</dt>
                  <dd className="pb34">
                    <p>第二十三条 本保险期间届满前三十日内，投保人可向保险人申请续保。经保险人审核同意并按续保时对应的费率收取保险费后本保险合同将持续有效。</p>
                    <p>第二十四条 若于保险期间届满时发生下列情形之一，则保险人不再接受续保：</p>
                    <p>(一) 保险人调整费率但投保人不接受续保当时保险人提供的新费率标准的；</p>
                    <p>(二) 被保险人续保时年满八十一周岁。</p>

                  </dd>

                  <dt>争议处理和法律适用</dt>
                  <dd className="pb34">
                    <p>第二十五条 因履行本保险合同发生的争议，由当事人协商解决。协商不成的，提交保险单载明的仲裁机构仲裁；保险单未载明仲裁机构或者争议发生后未达成仲裁协议的，依法向人民法院起诉。</p>
                    <p>第二十六条 与本保险合同有关的以及履行本保险合同产生的一切争议处理适用中华人民共和国法律（不包括港澳台地区法律）。</p>

                  </dd>

                  <dt>其他事项</dt>
                  <dd className="pb34">
                    <p> 被保险人的投保年龄按周岁计算。投保人应在投保本保险时将被保险人的真实年龄与性别在投保单上填明，如果发生错误，保险人按照下列规定办理：</p>
                    <p>（一） 投保人申报的被保险人年龄不真实，并且其真实年龄不符合本保险合同约定的年龄限制的，保险人有权解除本保险合同，并向投保人退还本保险合同的未满期净保费。</p>
                    <p>（二） 投保人申报的被保险人年龄或性别不真实，致使投保人支付的保险费少于应付保险费的，保险人有权更正并要求投保人补交保险费。若已经发生保险事故，在给付保险金时按照实付保险费与应付保险费的比例支付。</p>
                    <p>（三） 投保人申报的被保险人年龄或性别不真实，致使投保人支付的保险费多于应付保险费的，保险人应将多收的保险费无息退还投保人。</p>
                    <p>第二十八条 投保人的电话等联系方式变更时，应及时以书面形式或双方认可的其他形式通知保险人。投保人未以书面形式或双方认可的其他形式通知的，保险人将按本保险合同载明的最后联系方式发送有关通知，并视为已送达给投保人。</p>
                    <p>第二十九条 投保人在投保后，可以书面通知要求解除本保险合同，并向保险人提供下列证明和资料：</p>
                    <p>(一) 保险合同；</p>
                    <p>(二) 解除合同申请书；</p>
                    <p>(三) 投保人的有效身份证明。</p>
                    <p>自保险人收到解除合同申请书之日起，本保险合同终止。保险人在收到上述证明和资料之日起三十日内退还本保险合同的未满期净保费。</p>
                    <p>第三十条 本保险合同未尽事宜依照合同签订时生效的《中华人民共和国保险法》处理。</p>
                  </dd>

                  <dt>释义</dt>
                  <dd>
                    <p>第三十一条 本保险合同具有特定含义的名词，其定义如下：</p>
                    <p>【社会医疗保险】本保险合同所称的社会医疗保险包括城镇职工基本医疗保险、城镇居民基本医疗保险、新型农村合作医疗、医疗救助等政府举办的基本医疗保障项目。</p>
                    <p>【周岁】指按有效身份证件中记载的出生日期计算的年龄，自出生之日起为零周岁，每经过一年增加一岁，不足一年的不计。</p>
                    <p>【腺样体肥大 】腺样体也叫咽扁桃体或增殖体。腺样体肥大指腺样体因炎症的反复刺激而发生病理性增生，从而引起鼻塞、张口呼吸等症状。</p>
                    <p>【疝气】指人体组织或器官一部分离开其正常的解剖位置，通过人体间隙、缺损或薄弱部位进入另一部位；或胚胎时的裂隙未能完全闭合，遗留成为裂孔。</p>
                    <p>【扁桃腺的疾病 】扁桃腺又称扁桃体，是人体近喉部两侧的多个腺体组织，是人体免疫系统一部分。其疾病包括但不限于急慢性扁桃体炎、扁桃体肿瘤。</p>
                    <p>【住院】指被保险人因疾病或意外伤害而入住医院的正式病房进行治疗，并正式办理入出院手续，不包括入住门诊观察室、家庭病床、其他挂床住院及不合理的住院。
                    </p>
                    <p>【意外伤害】指遭受外来的、突发的、非本意的、非疾病的使身体受到伤害的客观事件。</p>
                    <p>【保险事故】指保险合同约定的保险责任范围内的事故。</p>
                    <p>【医院】指经国家卫生部门审核的二级或二级以上的综合性公立医院或专科公立医院，但不包括作为诊所、康复、联合病房、家庭病床、护理、修养或戒酒、戒毒等医疗机构。该医院必须具有系统的、充分的诊断设备，全套外科手术设备并提供24小时的医疗与护理服务。医院中的特需医疗、外宾医疗、干部病房不在本保险合同保障范围。</p>
                    <p>【专科医生】专科医生应当同时满足以下四项资格条件：</p>
                    <p>（一）具有有效的中华人民共和国《医师资格证书》；</p>
                    <p>（二）具有有效的中华人民共和国《医师执业证书》，并按期到相关部门登记注册；</p>
                    <p>（三）具有有效的中华人民共和国主治医师或主治医师以上职称的《医师职称证书》；</p>
                    <p>（四）在二级或二级以上医院的相应科室从事临床工作三年以上。</p>
                    <p>【住院医疗费用】 包括床位费、膳食费、医生费、药品费、治疗费、护理费、检查检验费、手术费、救护车使用费各项费用。</p>
                    <p>【床位费】指被保险人住院期间使用的医院床位的费用。</p>
                    <p>【膳食费】指住院期间实际发生的、由医院提供的合理的、符合惯常标准的膳食费用，但不包括住院期间购买的个人用品。</p>
                    <p>【医生费】包括外科医生、麻醉师、内科医生、专科医生的费用。</p>
                    <p>【药品费】指住院期间实际发生的合理且必要的由医生开具的具有国家药品监督管理部门核发的药品批准文号或者进口药品注册证书、医药产品注册证书的国产或进口药品的费用。</p>
                    <p>【治疗费】指住院期间以治疗疾病为目的，提供必要的医学手段而发生的合理的治疗者的技术劳务费和医疗器械使用费，以及消耗品的费用，包括诊疗费、注射费、机疗费、理疗费、输血费、输氧费、体外反搏费等。</p>
                    <p>【护理费】指住院期间根据医嘱所示的护理等级确定的护理费用。</p>
                    <p>【检查检验费】指住院期间实际发生的、以诊断疾病为目的，采取必要的医学手段进行检查及检验而发生的合理的医疗费用，包括诊查费、妇检费、X光费、心电图费、B超费、脑电图费、内窥镜费、肺功能仪费、分子生化检验费和血、尿、便常规检验费等。</p>
                    <p>【手术费】指当地卫生行政部门规定的手术项目的费用。包括手术费、麻醉费、手术监测费、手术材料费、术中用药费、手术设备费；若因器官移植而发生的手术费用，不包括器官本身的费用和获取器官过程中的费用。</p>
                    <p>【救护车使用费】指为抢救生命由急救中心派出的救护车费用及医院转诊过程中的医院用车费。</p>
                    <p>【毒品】指《中华人民共和国刑法》规定的鸦片、海洛因、甲基苯丙胺（冰毒）、吗啡、大麻、可卡因以及国家规定管制的其他能够使人形成瘾癖的麻醉药品和精神药品，但不包括由医生开具并遵医嘱使用的用于治疗疾病但含有毒品成分的处方药品。</p>
                    <p>【酒后驾驶】指经检测或鉴定，发生事故时车辆驾驶人员每百毫升血液中的酒精含量达到或超过一定的标准，公安机关交通管理部门依据《中华人民共和国道路交通安全法》的规定认定为饮酒后驾驶或醉酒后驾驶。</p>
                    <p>【无有效驾驶证驾驶】指下列情形之一：</p>
                    <p>（一） 没有驾驶证驾驶；</p>
                    <p>（二） 驾驶与驾驶证准驾车型不相符合的车辆；</p>
                    <p>（三） 驾驶员持审验不合格的驾驶证驾驶；</p>
                    <p>（四） 未经公安交通管理部门同意，持未审验的驾驶证驾驶；</p>
                    <p>（五） 持学习驾驶证学习驾车时，无教练员随车指导，或不按指定时间、路线学习驾车；</p>
                    <p>（六） 公安交通管理部门规定的其他无有效驾驶证驾驶的情况。</p>
                    <p>【无有效行驶证】指下列情形之一：</p>
                    <p>（一） 没有机动车行驶证；</p>
                    <p>（二） 未在法律规定期限内按时进行或通过安全技术检验。</p>
                    <p>【机动车】指以动力装置驱动或者牵引，上道路行驶的供人员乘用或者用于运送物品以及进行工程专项作业的轮式车辆。</p>
                    <p>【感染艾滋病病毒或患艾滋病】艾滋病病毒指人类免疫缺陷病毒，英文缩写为HIV。艾滋病指人类免疫缺陷病毒引起的获得性免疫缺陷综合征，英文缩写为AIDS。</p>
                    <p>在人体血液或其它样本中检测到艾滋病病毒或其抗体呈阳性，没有出现临床症状或体征的，为感染艾滋病病毒；如果同时出现了明显临床症状或体征的，为患艾滋病。</p>
                    <p>【遗传性疾病】指生殖细胞或受精卵的遗传物质（染色体和基因）发生突变或畸变所引起的疾病，通常具有由亲代传至后代的垂直传递的特征。</p>
                    <p>【先天性畸形、变形或染色体异常】指被保险人出生时就具有的畸形、变形或染色体异常。先天性畸形、变形和染色体异常依照世界卫生组织《疾病和有关健康问题的国际统计分类》（ICD-10）确定。</p>
                    <p>【既往症】指在本保险合同生效之前罹患的被保险人已知或应该知道的有关疾病或症状。通常有以下情况： </p>
                    <p>（一）本保险合同生效前，医生已有明确诊断，长期治疗未间断； </p>
                    <p>（二）本保险合同生效前，医生已有明确诊断，治疗后症状未完全消失，有间断用药情况； </p>
                    <p>（三）本保险合同生效前发生，医生已有明确诊断，但未予治疗；或者未经医生诊断和治疗，但症状明显且持续存在，以普通人医学常识应当知晓。</p>
                    <p>【潜水】指使用辅助呼吸器材在江、河、湖、海、水库、运河等水域进行的水下运动。</p>
                    <p>【攀岩】指攀登悬崖、楼宇外墙、人造悬崖、冰崖、冰山等运动。</p>
                    <p>【探险】指明知在某种特定的自然条件下有失去生命或使身体受到伤害的危险，而故意使自己置身于其中的行为，如：江河漂流、登山、徒步穿越沙漠或人迹罕至的原始森林等活动。</p>
                    <p>【武术比赛】指两人或两人以上对抗性柔道、空手道、跆拳道、散打、拳击等各种拳术及使用器械的对抗性比赛。</p>
                    <p>【特技表演】指进行马术、杂技、驯兽等表演。</p>
                    <p>【有效身份证明】指由政府主管部门规定的证明个人身份的证件，如：居民身份证、按规定可使用的有效护照、军官证、警官证、士兵证等证件。</p>
                    <p>【未满期净保费】未满期净保险费＝保险费×（1-35%）×（1－保险经过日数/保险期间的日数），经过日数不足1日的按1日计算。</p>
                  </dd>
                </dl>
              </div>

              <div className="faq-list product-con js-claim-con-wrap pb62" style={{display: this.state.tabIndex===3? 'block':'none'}}>

                <dl className="pb34">
                  <dt>受益人或继承人为未成年人或无民事行为能力人，如何申请保险金？</dt>
                  <dd><strong>答：</strong>受益人或继承人为未成年人或无民事行为能力人时，由其合法监护人代其申请领取保险金，其合法监护人还必须提供受益人或继承人为未成年人或无民事行为能力人的证明和监护人具有合法监护权的证明。</dd>
                </dl>

                <dl className="pb34">
                  <dt>我住在哪些医院的住院费用可以报销？</dt>
                  <dd><strong>答：</strong>您因意外伤害或者疾病在中华人民共和国境内（不含港、澳、台地区）二级或二级以上的综合性医院或专科公立医院，或保险人认可的医院（不含特需病房、外宾病房或其他不属于保单保障范畴的医疗机构）住院治疗的，该保险为您需个人支付的、必需且合理的住院医疗费用给予报销。</dd>
                </dl>

                <dl className="pb34">
                  <dt>我所有的住院费都可以报销吗？</dt>
                  <dd><strong>答：</strong>对于您在保单约定的医院住院，除责任免除条款约定的情形外，扣除免赔额部分的费用，无论是否属于医保范围，均可报销，最高报销金额为100万元。该保险百万医疗保险保障，为您的健康解忧消愁。</dd>
                </dl>

                <dl className="pb34">
                  <dt>住院费用包含哪些项目？</dt>
                  <dd><strong>答：</strong>住院期间发生的合理且必要的医疗费用，包括床位费、膳食费、医生费、药品费、治疗费、护理费、检查检验费、手术费、救护车使用费各项费用。报销总额可达100万，且各个费用都没有单独的限额。</dd>
                </dl>

                <dl className="pb34">
                  <dt>商业保险与社保同时需要赔付，资料原件只有一份，如何处理？</dt>
                  <dd><strong>答：</strong>由于一般社保要求必须提供原件，才能理赔，因此建议您先进行社保理赔，再进行商业险理赔。进行商业险理赔时请提供以下材料：<br/>1.资料复印件；<br/>2.社保分割单原件或是社保结算单原件；<br/>3.如果已经由其他商业险赔付过的，需要提供商业保险的分割单原件所有理赔单证的复印件，复印件由保存的单位注明与“原件相符”等。</dd>
                </dl>

                <dl className="pb34">
                  <dt>如果我已经买了其他公司的同类产品，可以再次购买吗？</dt>
                  <dd><strong>答：</strong>该产品在本公司限购1份。</dd>
                </dl>

                <dl className="pb34">
                  <dt>这个产品能自动续保吗？如何续保，费用会变化吗？续保保费会是多少？</dt>
                  <dd><strong>答：</strong>根据条款中约定，保险期间届满前30日内，投保人可向保险人申请续保。经保险人审核同意并按续保时对应的费率收取保险费后本产品将持续有效。</dd>
                </dl>

                <dl className="pb34">
                  <dt>是不是买了这个产品后其他产品都不需要买了？</dt>
                  <dd><strong>答：</strong>需要结合您自身风险需求来决定。通常一个完整的保险组合除了医疗产品，一般还包括意外险、重大疾病保险等。如有兴趣，请浏览“安心商城”的其它产品。</dd>
                </dl>

                <dl className="pb34">
                  <dt>挂号费是否属于理赔范围？</dt>
                  <dd><strong>答：</strong>您发生的挂号费如果满足以下任一情形，即属于理赔范围：<br/>1.与本产品约定的特殊门诊医疗（在医院进行门诊肾透析、门诊恶性肿瘤电疗、化疗或放疗）相关。<br/>2.与本产品约定住院前后门急诊医疗费用保险金相关：与住院原因相同，而且发生时间是在相关住院前七日内（含住院当日）和出院后三十日内（含出院当日）。</dd>
                </dl>

                <dl className="pb34">
                  <dt>住院前后门急诊医疗费这个这个判断的标准是什么？什么样的门急诊才算住院前后门急诊？</dt>
                  <dd><strong>答：</strong>住院前后门急诊医疗费发生的原因必须与住院原因相同，而且发生的时间须在该次住院前七日内（含住院当日）以及出院后三十日内（含出院当日）。</dd>
                </dl>

                <dl className="pb34">
                  <dt>这个产品保不保门诊？</dt>
                  <dd><strong>答：</strong>本产品承担“住院前后门/急诊”以及“特殊门诊”责任。不承担除此以外的门诊责任。</dd>
                </dl>

                <dl className="pb34">
                  <dt>如果我是以有社保身份购买，但是实际就医我并没有使用社保，如何理赔？</dt>
                  <dd><strong>答：</strong>若被保险人以社保身份购买，但是实际就医并没有使用社保结算，保险公司将在各项保障责任的限额、免赔额及给付比例范围内计算合理理赔金，再乘以60%给付保险金。</dd>
                </dl>

                <dl className="pb34">
                  <dt>普通门急诊可以报销吗？</dt>
                  <dd><strong>答：</strong>1）与本产品约定的特殊门诊医疗（在医院进行门诊肾透析、门诊恶性肿瘤电疗、化疗或放疗）相关。<br/>2）与本产品约定住院前后门急诊医疗费用保险金相关：与住院原因相同，而且发生时间是在相关住院前七日内（含住院当日）和出院后三十日内（含出院当日）。</dd>
                </dl>

                <dl className="pb34">
                  <dt>这个产品限定销售地区吗？</dt>
                  <dd><strong>答：</strong>本产品的销售地区限中华人民共和国境内所有地区（不含港澳台）。</dd>
                </dl>

              </div>
            </div>
          </div>
          <div className="subsidy-con" style={{marginBottom:0}}>
            <div className="common-problem public-subsidy pt36">
              <p>产品售卖地区：全国</p>
            </div>
          </div>
        </article>
        <nav className="details-nav" style={{height:'1.32813rem'}}>
          <div className="declare" style={{display:'none'}}>
            <label className="declaration">
              <input type="checkbox" name="check"/>
                <span></span>
                我已阅读并同意<a>《投保声明》</a>条款
            </label>
          </div>
          <ul className="bot-nav">
            <li><a href="tel:400-88-45678"><img src={require('../assets/iconfont-kefudianhua.png')}/></a></li>
            <li>保费：￥<span id="bf">{this.state.proposalIndex===0?this.state.proposal0.totalFirstYearPrem : this.state.proposal1.totalFirstYearPrem}</span></li>
            <li id="next" checked="true" onClick={()=>this.saveProposal()}>提交订单</li>
          </ul>
        </nav>
      </section>
    )
  }
}
