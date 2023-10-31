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
}
