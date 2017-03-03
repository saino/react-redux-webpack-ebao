import React, {Component, PropTypes} from 'react';
import '../Products.scss';
import Question from '../components/Question';
import Modal from '../../components/Modal';

const questions = [
  '被保险人过去是否被保险公司解除合同或在投保、复效时被延期、拒保、附加条件承保？或曾经申请过重大疾病的理赔？',
  '被保险人一年内去医院进行过门诊的检查、服药、手术或其他治疗但不包括普通感冒、流感或敏感症；或曾考虑短期内寻求诊疗、检查、测试、住院治疗或外科手术。过去三年内曾有医学检查（包括健康体检）结果异常。过去五年曾住院治疗检查或治疗（包括入住疗养院、康复医院等医疗机构）。',
  '被保险人是否目前或过去患有下列疾病、症候？脑、神经系统及精神方面疾病，心血管疾病，呼吸系统疾病，消化系统疾病，泌尿系统疾病，骨骼、肌肉、结缔组织的疾病，内分泌、血液系统疾病，五官科疾病，以上未提及的肿瘤和癌症，原因不明的发热、消瘦（体重一年内下降超过5公斤）、肥胖等，有无职业病、酒精中毒、其他药品中毒。',
  '被保险人是否有智能障碍？是否有五官、脊柱、胸廓、四肢、手指、足趾缺损、畸形或功能障碍？',
  '被保险人目前是否怀孕？被保险人目前或既往怀孕及生产期间是否有合并症？例如：蛋白尿、血尿、高血压、糖尿病等。被保险人是否曾有阴道不规则流血、乳房肿块、溢乳、腋下淋巴结肿大、乳腺增生或纤维瘤、其他乳腺疾病？被保险人是否曾有子宫肌瘤、内膜异位症、子宫颈上皮不典型增生、卵巢囊肿、畸胎瘤等？',
  '被保险人出生时是否体重低于2.5公斤，是否有早产、难产、窒息和抢救史？',
  '被保险人是否存在先天性或遗传性疾病或畸形?是否有生长发育异常？是否有心脏、血管、神经、运动或智力方面异常？是否因病住院治疗或手术？',
];
export default class Questionnaire extends Component {
  static propTypes = {
    onRequestClose: PropTypes.func,
    open: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = {
      answers: questions.map(questions=>false)
    }
  }

  onAnswerChange(index, value) {
    let answers = [...this.state.answers];
    answers[index] = value;
    this.setState({answers});
  }

  canSubmit() {
    for(let answer of this.state.answers) {
      if(answer) {
        return false;
      }
    }
    return true;
  }

  render() {
    let {open, onRequestClose} = this.props;
    return (
      <Modal title="安心综合医疗保险" titleStyle={{fontSize:'0.48rem'}} bodyStyle={{padding:0}} open={open}>
        <div>
          <div className="subsidy-con" style={{marginBottom: 0}}>
            <h2 className="subsidywent">请如实填写本次投保的家庭成员的下列问题</h2>
            {questions.map((question,index)=><Question key={index} question={question} index={index} value={this.state.answers[index]} onChange={value=>this.onAnswerChange(index,value)}/>)}
            <div className="pro-introduced public-subsidy ">
              <div className="con-box">
                <div className="scheme-cover-gaozhi queding">
                  <label className={this.canSubmit()? 'active' : ''} onClick={()=>this.canSubmit() && onRequestClose && onRequestClose()}>
                    <input name="cover" type="radio"/>
                    <span>提交审核</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}
