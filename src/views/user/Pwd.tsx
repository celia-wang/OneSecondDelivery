import { type FC } from "react";
// import { NavLink } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { updataPassword } from "@/service/api";

const agentadd: FC = () => {
  // 收集数据
  const onFinish = (values: FieldType) => {
    updataPassword(values)
      .then(async (res: any) => {
        if (res?.data?.code !== 200) {
          await message.error(res?.data?.msg);
        } else {
          await message.success({
            content: "密码成功"
          });
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  interface FieldType {
    adminPwd: string;
    confirmPwd: string;
    oldpwd: string;
  }

  return (
    <div className="p-[20px] w-[100%]">
      {/* 标题 */}
      <div className="flex items-center">
        <p className="text-[#333333] text-[20px] font-semibold ml-3">
          修改密码
        </p>
      </div>
      <div className="mt-3 ml-10">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<FieldType> label="旧密码" name="adminPwd">
            <Input className="w-[500px] h-[40px]" />
          </Form.Item>

          <Form.Item<FieldType> label="新密码" name="confirmPwd">
            <Input className="w-[500px] h-[40px]" type="password" />
          </Form.Item>

          <Form.Item<FieldType> label="确认密码" name="oldpwd">
            <Input className="w-[500px] h-[40px]" type="password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default agentadd;
