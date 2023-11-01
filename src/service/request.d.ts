namespace Req {
  type AdminLogin = {
    adminName: string;
    adminPwd: string;
    no: string;
    verifyCode: string;
  };
  type AdminAgent = {
    current: number;
    pageSize: number;
  };
  type TOrderList = {
    current: number;
    pageSize: number;
    mobileNumber?: number;
    orderNo?: string;
    riderNo?: string;
    status?: number;
    userNo?: string;
  };
  type Valuation = {
    ruleName: string;
    current: number;
    pageSize: number;
  };
  type ValFount = {
    ruleName: string;
    current: number;
    pageSize: number;
  };
  type Weight = {
    tagName: string;
    current: number;
    pageSize: number;
  };
  type Tag = {
    groupName: string;
    current: number;
    pageSize: number;
  };
  /**
   * wsx
   * 系统设置
   */
  // 小程序设置
  type AppDevelopPostData = {
    qqAppSecret?: string;
    qqAppid?: string;
    ttAppSecret?: string;
    ttAppid?: string;
    wxAppId: string;
    wxAppSecret: string;
  };
  type AppPayPostData = {
    wxMchId: string;
    notifyUrl: string;
    wxMchSecert: string;
  };
  type AppAliPostData = {
    accessKeyId: string;
    accessKeySecret: string;
    arn: string;
    ossBucket: string;
    ossRegion: string;
    smsSignName: string;
    smsTemplateCode: string;
  };
  type AppComwxPostData = {
    corpid: string;
    corpsecret: string;
    verifyChatid?: string;
  };
  type AppCreatePostData = {
    name: string;
    owner: string;
    userlist: string[];
  }[];
  //分享设置
  type ShareData = {
    desc?: string;
    path?: string;
    title?: string;
    url?: string;
  };
  type AdminCouponStatus = {
    couponNo: string;
    status: string;
  };
  type AdminCouponListChange = {
    conditionService?: string;
    couponName?: string;
    current: number;
    pageSize: number;
    status?: number;
  };
  type AdminCouponAdd = {
    conditionService: string;
    conditionsAmount: number;
    couponName: string;
    deadlineDays: string;
    discountAmount: number;
    limitNumber: number;
    status: number;
  };
  type AdminCouponUpdate = {
    conditionService: string;
    conditionsAmount: number;
    couponName: string;
    couponNo: string;
    deadlineDays: string;
    discountAmount: number;
    limitNumber: number;
    status: number;
  };
  type DataOverview = {
    code: number;
    msg: string;
    data: {
      userTotal: number;
      orderCompleteTotal: number;
      tradeTotal: number;
      incomeTotal: number;
      yesterdayUserTotal: string;
      yesterdayOrderCompleteTotal: string;
      yesterdayTradeTotal: number;
      yesterdayIncomeTotal: number;
    };
  };
  type OrderData = {
    code: number;
    msg: string;
    data: {
      cancel: string;
      close: string;
      waitPay: string;
      waitReceive: string;
      sending: string;
      waitConfirm: string;
      complete: string;
      refund: string;
    };
  };
  type brokerData = {
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
  type AdminData = {
    code: number;
    msg: string;
    data: {
      pageSize: number;
      current: number;
      count: number;
      totalPages: number;
      data: {
        adminNo: string;
        adminName: string;
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
  type ListUsersData = {
    code: number;
    msg: string;
    data: {
      pageSize: number;
      current: number;
      count: number;
      data: [
        {
          id: number;
          createTime: string;
          updateTime: string;
          userNo: string;
          countryCode: string;
          mobileNumber: string;
          avatarUrl: object;
          nickName: string;
          gender: number;
          province: object;
          city: object;
          area: object;
          status: number;
          homeAddressNo: object;
          companyAddressNo: object;
        },
        {
          id: number;
          createTime: string;
          updateTime: string;
          userNo: string;
          countryCode: string;
          mobileNumber: string;
          avatarUrl: string;
          nickName: string;
          gender: number;
          province: object;
          city: object;
          area: object;
          status: number;
          homeAddressNo: object;
          companyAddressNo: object;
        },
        {
          id: number;
          createTime: string;
          updateTime: string;
          userNo: string;
          countryCode: string;
          mobileNumber: string;
          avatarUrl: object;
          nickName: string;
          gender: number;
          province: object;
          city: object;
          area: object;
          status: number;
          homeAddressNo: object;
          companyAddressNo: object;
        },
        {
          id: number;
          createTime: string;
          updateTime: string;
          userNo: string;
          countryCode: string;
          mobileNumber: string;
          avatarUrl: object;
          nickName: string;
          gender: number;
          province: object;
          city: object;
          area: object;
          status: number;
          homeAddressNo: object;
          companyAddressNo: object;
        },
        {
          id: number;
          createTime: string;
          updateTime: string;
          userNo: string;
          countryCode: string;
          mobileNumber: string;
          avatarUrl: object;
          nickName: string;
          gender: number;
          province: object;
          city: object;
          area: object;
          status: number;
          homeAddressNo: object;
          companyAddressNo: object;
        },
        {
          id: number;
          createTime: string;
          updateTime: string;
          userNo: string;
          countryCode: string;
          mobileNumber: string;
          avatarUrl: string;
          nickName: string;
          gender: number;
          province: object;
          city: object;
          area: object;
          status: number;
          homeAddressNo: object;
          companyAddressNo: object;
        },
        {
          id: number;
          createTime: string;
          updateTime: string;
          userNo: string;
          countryCode: string;
          mobileNumber: string;
          avatarUrl: string;
          nickName: string;
          gender: number;
          province: object;
          city: object;
          area: object;
          status: number;
          homeAddressNo: object;
          companyAddressNo: object;
        },
        {
          id: number;
          createTime: string;
          updateTime: string;
          userNo: string;
          countryCode: string;
          mobileNumber: string;
          avatarUrl: string;
          nickName: string;
          gender: number;
          province: object;
          city: object;
          area: object;
          status: number;
          homeAddressNo: object;
          companyAddressNo: object;
        },
        {
          id: number;
          createTime: string;
          updateTime: string;
          userNo: string;
          countryCode: string;
          mobileNumber: string;
          avatarUrl: string;
          nickName: string;
          gender: number;
          province: object;
          city: object;
          area: object;
          status: number;
          homeAddressNo: object;
          companyAddressNo: object;
        },
        {
          id: number;
          createTime: string;
          updateTime: string;
          userNo: string;
          countryCode: string;
          mobileNumber: string;
          avatarUrl: string;
          nickName: string;
          gender: number;
          province: object;
          city: object;
          area: object;
          status: number;
          homeAddressNo: object;
          companyAddressNo: object;
        },
        {
          id: number;
          createTime: string;
          updateTime: string;
          userNo: string;
          countryCode: string;
          mobileNumber: string;
          avatarUrl: string;
          nickName: string;
          gender: number;
          province: string;
          city: string;
          area: object;
          status: number;
          homeAddressNo: object;
          companyAddressNo: object;
        },
        {
          id: number;
          createTime: string;
          updateTime: string;
          userNo: string;
          countryCode: string;
          mobileNumber: string;
          avatarUrl: string;
          nickName: string;
          gender: number;
          province: string;
          city: string;
          area: object;
          status: number;
          homeAddressNo: object;
          companyAddressNo: object;
        },
        {
          id: number;
          createTime: string;
          updateTime: string;
          userNo: string;
          countryCode: string;
          mobileNumber: string;
          avatarUrl: object;
          nickName: string;
          gender: number;
          province: object;
          city: object;
          area: object;
          status: number;
          homeAddressNo: object;
          companyAddressNo: object;
        },
        {
          id: number;
          createTime: string;
          updateTime: string;
          userNo: string;
          countryCode: string;
          mobileNumber: string;
          avatarUrl: object;
          nickName: string;
          gender: number;
          province: object;
          city: object;
          area: object;
          status: number;
          homeAddressNo: object;
          companyAddressNo: object;
        },
        {
          id: number;
          createTime: string;
          updateTime: string;
          userNo: string;
          countryCode: string;
          mobileNumber: string;
          avatarUrl: object;
          nickName: string;
          gender: number;
          province: object;
          city: object;
          area: object;
          status: number;
          homeAddressNo: object;
          companyAddressNo: object;
        },
        {
          id: number;
          createTime: string;
          updateTime: string;
          userNo: string;
          countryCode: string;
          mobileNumber: string;
          avatarUrl: object;
          nickName: string;
          gender: number;
          province: object;
          city: object;
          area: object;
          status: number;
          homeAddressNo: object;
          companyAddressNo: object;
        },
        {
          id: number;
          createTime: string;
          updateTime: string;
          userNo: string;
          countryCode: string;
          mobileNumber: string;
          avatarUrl: string;
          nickName: string;
          gender: number;
          province: object;
          city: object;
          area: object;
          status: number;
          homeAddressNo: object;
          companyAddressNo: object;
        },
        {
          id: number;
          createTime: string;
          updateTime: string;
          userNo: string;
          countryCode: string;
          mobileNumber: string;
          avatarUrl: object;
          nickName: string;
          gender: number;
          province: object;
          city: object;
          area: object;
          status: number;
          homeAddressNo: object;
          companyAddressNo: object;
        },
        {
          id: number;
          createTime: string;
          updateTime: string;
          userNo: string;
          countryCode: string;
          mobileNumber: string;
          avatarUrl: object;
          nickName: string;
          gender: number;
          province: object;
          city: object;
          area: object;
          status: number;
          homeAddressNo: object;
          companyAddressNo: object;
        },
        {
          id: number;
          createTime: string;
          updateTime: string;
          userNo: string;
          countryCode: string;
          mobileNumber: string;
          avatarUrl: object;
          nickName: string;
          gender: number;
          province: object;
          city: object;
          area: object;
          status: number;
          homeAddressNo: object;
          companyAddressNo: object;
        }
      ];
    };
  };
}
