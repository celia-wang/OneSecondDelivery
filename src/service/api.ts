import request from "@/utils/request";

// 验证码
export const getVerifyCode = async () =>
  await request.get<Res.VerifyCode>("/api/admin/verifycode");

// 登录
export const postAdminLogin = async (data: Req.AdminLogin) =>
  await request.post("/api/admin/login", data);

export const adminAgent = async (params: Req.AdminAgent) =>
  await request.get<Res.AgentList>("api/admin/agent/list", { params });

// 计价表单
export const getValuation = async (params: Req.Valuation) =>
  await request.get<Res.ValuationList>(
    "/api/admin/citys/valuation/list?current=1&pageSize=20",
    {
      params
    }
  );

export const getValFount = async (params: Req.Valuation) =>
  await request.get<Res.ValFountList>(
    "/api/admin/citys/valuation/list?current=1&pageSize=20&ruleName=",
    {
      params
    }
  );

// 重量标签
export const getWeight = async (params: Req.Weight) =>
  await request.get<Res.WeightList>(
    "/api/admin/citys/weight/list?current=1&pageSize=20",
    {
      params
    }
  );

// 物品标签组
export const getTag = async (params: Req.Tag) =>
  await request.get<Res.TagList>(
    "/api/admin/citys/tag/list?current=1&pageSize=20",
    {
      params
    }
  );
