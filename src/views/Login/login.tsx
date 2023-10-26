import { type FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type AxiosResponse } from "axios";
import { Col, Row, Form, Input, Button, Space, notification } from "antd";
import { Icon } from "@iconify/react";
import styled from "styled-components";
import { useRequest } from "ahooks";
import { getVerifyCode, postAdminLogin } from "@/service/api";

const Wrapper = styled.div`
  .ace {
    margin: 5px;
  }
`;

const Login: FC = () => {
  // 刷新验证码
  const [count, setCount] = useState(0);
  const refreshVerifyCode = () => {
    setCount((count) => count + 1);
  };
  const navigate = useNavigate();

  // 登陆成功的回调函数
  const onRunAdminLoginSuccess = (res: AxiosResponse<Res.AdminLogin>) => {
    if (res.data.code === 200) {
      notification.success({
        message: "登陆成功",
        description: "恭喜你登陆成功！"
      });
      navigate("/");
    } else {
      refreshVerifyCode();
    }
  };

  const { data: VerifyData } = useRequest(getVerifyCode, {
    refreshDeps: [count]
  });
  const { run: runAdminLogin } = useRequest(
    async (values: Omit<Req.AdminLogin, "no">) =>
      await postAdminLogin({ ...values, no: VerifyData?.data.data.no ?? "" }),
    {
      manual: true,
      onSuccess: onRunAdminLoginSuccess
    }
  );

  return (
    <Wrapper className="w-[800px] fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-[#333]">
      <Row>
        <Col span={24}>
          <div className=" flex justify-center items-center h-[40px]">
            {/* logo */}
            <svg
              viewBox="0 0 45 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[45px] h-[30px]"
            >
              <path
                d="M24.7203 29.704H41.1008C41.6211 29.7041 42.1322 29.5669 42.5828 29.3061C43.0334 29.0454 43.4075 28.6704 43.6675 28.2188C43.9275 27.7672 44.0643 27.2549 44.0641 26.7335C44.0639 26.2121 43.9266 25.6999 43.6662 25.2485L32.6655 6.15312C32.4055 5.70162 32.0315 5.32667 31.581 5.06598C31.1305 4.8053 30.6195 4.66805 30.0994 4.66805C29.5792 4.66805 29.0682 4.8053 28.6177 5.06598C28.1672 5.32667 27.7932 5.70162 27.5332 6.15312L24.7203 11.039L19.2208 1.48485C18.9606 1.03338 18.5864 0.658493 18.1358 0.397853C17.6852 0.137213 17.1741 0 16.6538 0C16.1336 0 15.6225 0.137213 15.1719 0.397853C14.7213 0.658493 14.3471 1.03338 14.0868 1.48485L0.397874 25.2485C0.137452 25.6999 0.000226653 26.2121 2.8053e-07 26.7335C-0.000226092 27.2549 0.136554 27.7672 0.396584 28.2188C0.656614 28.6704 1.03072 29.0454 1.48129 29.3061C1.93185 29.5669 2.44298 29.7041 2.96326 29.704H13.2456C17.3195 29.704 20.3239 27.9106 22.3912 24.4118L27.4102 15.7008L30.0986 11.039L38.1667 25.0422H27.4102L24.7203 29.704ZM13.0779 25.0374L5.9022 25.0358L16.6586 6.36589L22.0257 15.7008L18.4322 21.9401C17.0593 24.2103 15.4996 25.0374 13.0779 25.0374Z"
                fill="#955ce6"
              ></path>
            </svg>
            <div className="ml-[20px] text-[26px] font-[500]">
              一秒快送后台管理系统
            </div>
          </div>
        </Col>
      </Row>

      <Row className="containerShadow h-[500px] mt-[40px] rounded-[8px]">
        <Col span={12} className="py-[40px] px-[20px]">
          <div className="w-[100%] h-[100%] flex items-center justify-center">
            <img
              src="http://192.168.145.28:8888/_nuxt/assets/images/login.png"
              alt=""
              className="w-[360px] h-[360px]"
            />
          </div>
        </Col>

        {/* 登录 */}
        <Col span={12} className="p-[40px]">
          <div className="mb-[40px] text-[20px] text-center">账号密码登录</div>

          <Form
            onFinish={runAdminLogin}
            name="normal_login"
            initialValues={{ remember: true }}
            size="large"
            className="w-[320px] "
            autoComplete="off"
          >
            {/* 账号 */}
            <Form.Item
              name="adminName"
              rules={[{ required: true, message: "请输入账号" }]}
            >
              <Input
                prefix={<Icon icon="ant-design:user-outlined" />}
                placeholder="管理员账号"
                allowClear
              />
            </Form.Item>

            {/* 密码 */}
            <Form.Item
              name="adminPwd"
              rules={[{ required: true, message: "请输入密码" }]}
            >
              <Input
                prefix={<Icon icon="ic:outline-lock" />}
                type="password"
                placeholder="管理员密码"
                allowClear
              />
            </Form.Item>

            {/* 验证码 */}
            <Form.Item
              name="verifyCode"
              rules={[{ required: true, message: "请输入验证码" }]}
            >
              <Space align="center">
                <Input
                  prefix={<Icon icon="gala:secure" />}
                  type="verificationCode"
                  placeholder="输入验证码"
                  allowClear
                />

                <div
                  onClick={() => {
                    refreshVerifyCode();
                  }}
                  aria-hidden="true"
                  className="w-[150px] h-[40px] cursor-pointer"
                  dangerouslySetInnerHTML={{
                    __html: VerifyData?.data.data.svg ?? ""
                  }}
                />
              </Space>
            </Form.Item>

            {/* 登录 */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-[100%] mt-[40px]"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>

      <Row className="mt-[40px]">
        <Col span={24}>
          <div className=" text-center text-[12px] text-[#666]">
            Copyright © 2022 包小盒 All right reserved.
          </div>
        </Col>
      </Row>
      <Row className="mt-[8px]">
        <Col span={24}>
          <div className=" text-center text-[14px] ">
            浙ICP备19025175号-4 aaa浙公网安备 33010602011191号
          </div>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default Login;
