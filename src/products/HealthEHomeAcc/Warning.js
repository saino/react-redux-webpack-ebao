import React from 'react';
import Modal from '../../components/Modal';

export const Warning = ({open, onRequestClose}) => (
  <Modal title="违反如实告知" titleStyle={{backgroundColor: 'red'}} showCloseButton={true} open={open} onRequestClose={()=>onRequestClose && onRequestClose()}>
    <div>
      <div>
        <p>发生理赔时，我们会对投保人填写的各项信息进行核实，如发现投保人违反了如实告知，根据《保险法》的规定，我们将不承担赔偿或给付保险金的责任。</p>
        <p>《中华人民共和国保险法》第十六条：</p>
        <p>“订立保险合同，保险人就保险标的或者被保险人的有关情况提出询问的，投保人应当如实告知。”</p>
        <p>“投保人故意或者因重大过失未履行前款规定的如实告知义务，足以影响保险人决定是否同意承保或者提高保险费率的，保险人有权解除合同。”</p>
        <p>“投保人故意不履行如实告知义务的，保险人对于合同解除前发生的保险事故，不承担赔偿或者给付保险金的责任，并不退还保险费。”</p>
        <p>“投保人因重大过失未履行如实告知义务，对保险事故的发生有严重影响的，投保人对于合同解除前发生的保险事故，不承担赔偿或者给付保险金的责任，但应当退还保险费。”</p>
        <p>* 在刑法中还有关于保险诈骗罪的有关规定，保险诈骗罪是指以非法获取保险金为目的，违反保险法规，采用虚构保险标的、保险事故或者制造保险事故等方法，向保险公司骗取保险</p>
        <p>《刑法》第一百九十八条：进行保险诈骗活动，数额较大的，处五年以下有期徒刑或者拘役，并处一万元以上十万元以下罚金；数额巨大或者有其他严重情节的，处五年以上十年以下有期徒刑，并处二万元以上二十万元以下罚金；数额特别巨大或者有其他特别严重情节的，处十年以上有期徒刑，并处二万元以上二十万元以下罚金或者没收财产。</p>
      </div>
      <a className="already-btn" onClick={()=>onRequestClose && onRequestClose()}>我已知晓</a>
    </div>
  </Modal>
);

export default Warning;
