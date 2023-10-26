import request from "@/utils/request";

// 验证码
export const getVerifyCode = async () =>
  await request.get<Res.VerifyCode>("/api/admin/verifycode");

// 登录
export const postAdminLogin = async (data: Req.AdminLogin) =>
  await request.post("/api/admin/login", data);

export const adminAgent = async (params: Req.AdminAgent) =>
  await request.get<Res.AgentList>("/admin/agent/list", { params });
