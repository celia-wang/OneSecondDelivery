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
}
