import React from 'react';
import Modal from '../../components/Modal';

export const Declaration = ({open, onRequestClose}) => (
  <Modal title="投保声明" showCloseButton={true} open={open} onRequestClose={()=>onRequestClose && onRequestClose()}>
    <div>
      <p>1. 本人自愿投保贵公司安心综合医疗保险（B款），并声明以上陈述及各项细节均真实无讹，且没有隐瞒任何重大事实以影响贵公司评估风险或接受本投保申请。</p>
      <p>2. 本人已认真阅读《安心财产保险有限责任公司安心综合医疗保险（B款）条款》的所有条款，尤其是“不能获得赔偿的情形”并对贵公司就保险合同的内容说明和提示完全理解，没有异议，申请投保。</p>
      <p>3. 本人知晓本投保申请将构成投保人与贵公司所签署的保险合同的依据，若未能披露与本保险相关之重大事实将可能导致贵公司不承担任何保险责任。保险合同生效日期以保险单所载生效日期为准，贵公司承担保险责任须以投保人缴付约定保险费并经贵公司同意承保为前提。</p>
      <p>4. 本人同意贵公司为本保险的目的收集本人的个人资料，无论该资料是从本投保申请或其他地方所获取，并授权可由贵公司用于该保险的投保审核；提供与该保险有关之服务及与本人联络的用途。</p>
    </div>
  </Modal>
);

export default Declaration;
