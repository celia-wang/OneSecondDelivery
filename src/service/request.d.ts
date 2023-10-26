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
}
