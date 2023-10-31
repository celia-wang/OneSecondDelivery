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

/**
 * wsx
 * 系统设置
 */
// 小程序设置
export const appDevelop = async () =>
  await request.get<Res.AppDevelopData>("/api/admin/config/appauth");
export const appDevelopPost = async (params: Req.AppDevelopPostData) =>
  await request.post<Res.AppDevelopData>("/api/admin/config/appauth", params);
export const appPay = async () =>
  await request.get<Res.AppPayData>("/api/admin/config/appmch");
export const appPayPost = async (params: Req.AppPayPostData) =>
  await request.post("/api/admin/config/appmch", params);
export const appMap = async () =>
  await request.get<Res.AppMapData>("/api/admin/config/map");

export const appMapPost = async (mapKey: number | string) =>
  await request.post("/api/admin/config/map", mapKey);

export const appAli = async () =>
  await request.get<Res.AppAliData>("/api/admin/config/ali");
export const appAliPost = async (params: Req.AppAliPostData) =>
  await request.post<Res.AppAliData>("/api/admin/config/ali", params);

export const appComwx = async () =>
  await request.get<Res.AppComwxData>("/api/admin/config/corwx");

export const appComwxPost = async (
  corpid: string,
  corpsecret: string,
  verifyChatid?: string | undefined
) =>
  await request.post("/api/admin/config/corwx", {
    corpid,
    corpsecret,
    verifyChatid
  });
export const appCreatePost = async (
  name: string,
  owner?: string,
  userlist?: string[]
) =>
  await request.post<Res.AppCreateData>("/api/admin/corwx/appchat/create", {
    name,
    owner,
    userlist
  });
// 分享设置
export const shareData = async () =>
  await request.get<Res.ShareData>("/api/admin/config/share");
export const sharePostData = async (params: Req.ShareData) =>
  await request.post("/api/admin/config/share", params);
// 积分设置
export const integralData = async () =>
  await request.get<Res.IntegralData>("/api/admin/config/integral");

export const integralPostData = async (withIntegral: {
  withIntegral: number;
}) => await request.post("/api/admin/config/integral", withIntegral);

// 用户指南
export const userData = async () =>
  await request.get<Res.userData>("/api//admin/config/guide/user");

export const userPostData = async (content: string | null) =>
  await request.post("/api//admin/config/guide/user", { content });

// 骑手指南
export const riderData = async () =>
  await request.get<Res.userData>("/api/admin/config/guide/rider");
export const riderPostData = async (content: string | undefined) =>
  await request.post("/api/admin/config/guide/rider", { content });
// 骑手协议 /admin/config/agreement/rider
export const riderAgreementData = async () =>
  await request.get<Res.userData>("/api/admin/config/agreement/rider");
export const riderAgreementPostData = async (content: string | undefined) =>
  await request.post("/api/admin/config/agreement/rider", { content });
