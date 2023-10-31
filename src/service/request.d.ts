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
}
