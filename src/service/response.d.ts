namespace Res {
  type VerifyCode = {
    code: number;
    msg: string;
    data: { svg: string; no: string };
  };

  type AdminLogin = {
    code: number;
    msg: null | string;
    data?: null | object;
  };

  type AgentList = {
    code: number;
    msg: string;
    data: {
      pageSize: number;
      current: number;
      count: number;
      totalPages: number;
      data: {
        agentNo: string;
        agentAccount: string;
        mobileNumber: string;
        realName: string;
        status: number;
        createTime: string;
        updateTime: string;
        defaultPwd: string;
        updatedBy: string;
      }[];
    };
  };

  type ValuationList = {
    code: number;
    msg: string;
    data: {
      pageSize: number;
      current: number;
      count: number;
      totalPages: number;
      data: {
        id: number;
        createTime: string;
        updateTime: string;
        isDelete: number;
        ruleName: string;
        ruleContext: {
          time: { gt: number; lte: number; price: number }[];
          weight: {
            gt: number;
            lte: number;
            price: number;
            unitWeight: number;
          }[];
          distance: {
            gt: number;
            lte: number;
            price: number;
            unitDistance: number;
          }[];
        };
        createdBy: string;
        updatedBy: string;
      }[];
    };
  };

  type ValFountList = {
    code: number;
    msg: string;
    data: {
      pageSize: number;
      current: number;
      count: number;
      totalPages: number;
      data: {
        id: number;
        createTime: string;
        updateTime: string;
        isDelete: number;
        ruleName: string;
        ruleContext: {
          time: { gt: number; lte: number; price: number }[];
          weight: {
            gt: number;
            lte: number;
            price: number;
            unitWeight: number;
          }[];
          distance: {
            gt: number;
            lte: number;
            price: number;
            unitDistance: number;
          }[];
        };
        createdBy: string;
        updatedBy: string;
      }[];
    };
  };

  type WeightList = {
    code: number;
    msg: string;
    data: {
      pageSize: number;
      current: number;
      count: number;
      totalPages: number;
      data: [
        {
          id: number;
          createTime: string;
          updateTime: string;
          isDelete: number;
          tagName: string;
          tags: { type: string; label: string; value: number[] }[];
          createdBy: string;
          updatedBy: string;
        }
      ];
    };
  };

  type TagList = {
    code: number;
    msg: string;
    data: {
      pageSize: number;
      current: number;
      count: number;
      totalPages: number;
      data: [
        {
          id: number;
          createTime: string;
          updateTime: string;
          isDelete: number;
          groupName: string;
          tags: string[];
          createdBy: string;
          updatedBy: string;
        }
      ];
    };
  };
  /**
   * wangshuxian
   * 系统设置
   */
  // 小程序设置
  type AppDevelopData = {
    code: number;
    msg: string;
    data: {
      qqAppid: string;
      ttAppid: string;
      wxAppId: string;
      qqAppSecret: string;
      ttAppSecret: string;
      wxAppSecret: string;
    };
  };

  type AppPayData = {
    code: number;
    msg: string;
    data: { wxMchId: string; notifyUrl: string; wxMchSecert: string };
  };

  type AppMapData = { code: number; msg: string; data: { mapKey: string } };

  type AppAliData = {
    code: number;
    msg: string;
    data: {
      arn: string;
      ossBucket: string;
      ossRegion: string;
      accessKeyId: string;
      smsSignName: string;
      accessKeySecret: string;
      smsTemplateCode: string;
    };
  };

  type AppComwxData = {
    code: number;
    msg: string;
    data: { corpid: string; corpsecret: string };
  };
  type AppCreateData = { code: number; msg: string; data: object };
  //分享设置
  type ShareData = {
    code: number;
    msg: string;
    data: { desc: string; path: string; title: string };
  };

  //积分设置
  type IntegralData = {
    code: number;
    msg: string;
    data: { withIntegral: number };
  };
  //用户指南
  type userData = { code: number; msg: string; data: { content: string } };
}
