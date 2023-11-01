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
  //用户列表
  type TOders = {
    key: React.Key;
    name: string;
    age: number;
    address: string;
    orderNo: string;
    nickName: string;
    avatarUrl: string;
    mobileNumber: string;
    payAmount: number;
    timePrice: number;
    startPrice: number;
    distancePrice: number;
    weightPrice: number;
    fee: number | string;
    status: number;
    goodsDesc: string;
    startAddress: TstartAddress;
    endAddress: TendAddress;
    createTime: string;
    updateTime: string;
    defaultPwd: string;
    updatedBy: string;
    refundAmount: number;
    refundStatus: number;
  };
  type TstartAddress = {
    addressDetail: string;
    city: string;
    contactName: string;
    mobileNumber: string;
    district: string;
    province: string;
    streetNumber: string;
  };

  type TendAddress = {
    addressDetail: string;
    city: string;
    contactName: string;
    district: string;
    mobileNumber: string;
    province: string;
  };

  //
  type TAdminConfigOrderCancel = {
    code: number;
    msg: string;
    data: {
      userCancelTips: [string, string, object];
      adminCancelTips: string[];
      agentCancelTips: string[];
      riderCancelTips: string[];
      userCancelRules: { price: number; timeRange: number[] }[];
      riderCancelRules: { price: number; timeRange: number[] }[];
    };
  };

  type TTipOptionsConfiguration = {
    code: number;
    msg: string;
    data: { feeTips: number[]; agentExtract: number; platformExtract: number };
  };

  //骑手列表
  type TRiderList2 = {
    id: number;
    createTime: string;
    updateTime: string;
    riderNo: string;
    status: number;
    userNo: string;
    startReceive: number;
    cityNo: string;
    realname: string;
    mobileNumber: string;
    avatarUrl: string;
    nickName: string;
  };
  type TRiderList = {
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
        riderNo: string;
        status: number;
        userNo: string;
        startReceive: number;
        cityNo: string;
        realname: string;
        mobileNumber: string;
        avatarUrl: string;
        nickName: string;
      }[];
    };
  };

  type TRiderAuditList2 = {
    id: number;
    createTime: string;
    updateTime: string;
    realname: string;
    idCardNo: string;
    avatarFaceImage: string;
    nationalFaceImage: string;
    status: number;
    refuseReason: string;
    userNo: string;
    cityNo: string;
  };
  type TRiderAuditList = {
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
        realname: string;
        idCardNo: string;
        avatarFaceImage: string;
        nationalFaceImage: string;
        status: number;
        refuseReason: string;
        userNo: string;
        cityNo: string;
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

  type AdminCouponList = {
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
        couponNo: string;
        couponName: string;
        deadlineDays: number;
        discountAmount: number;
        conditionsAmount: number;
        conditionService: string;
        cumulativeDrawNo: number;
        cumulativeUseNo: number;
        limitNumber: number;
        status: number;
      }[];
    };
  };
  type AdminCouponStatus = {
    code: number;
    msg: string;
  };
  type ResetPassword = { code: number; msg: string };
}
