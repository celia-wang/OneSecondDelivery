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
}
