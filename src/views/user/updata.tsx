import { type FC } from "react";
import { Button, Form, Input, message } from "antd";
import { PersonalSettings } from "@/service/api";
import { Icon } from "@iconify/react";

const updata: FC = () => {
  // 收集数据
  const onFinish = (values: {
    mobileNumber: string;
    realName: string;
    avatarUrl: object;
  }) => {
    PersonalSettings(values)
      .then(async (res: any) => {
        if (res?.data?.code !== 200) {
          await message.error(res?.data?.msg);
        } else {
          await message.success({
            content: "修改成功"
          });
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  interface FieldType {
    realName: string;
    mobileNumber: string;
  }

  return (
    <div className="p-[20px] w-[100%]">
      {/* 标题 */}
      <div className="flex items-center">
        <p className="text-[#333333] text-[20px] font-semibold ml-3">
          个人信息设置
        </p>
      </div>
      <div className="mt-3 ml-10">
        <p className="text-[14px] text-[#333333]">头像&nbsp;：</p>
        <div className="mt-[10px] flex justify-center flex-col items-center rounded-lg w-[100px] h-[100px] bg-[#f3f3f3] relative border-[1px] border-solid border-[#e1e1e1] hover:border-[#955ce6] ">
          <Icon
            icon="clarity:picture-solid"
            color="#999"
            width={20}
            className="hover:text-[#955ce6]"
          />
          <input
            type="file"
            className=" absolute top-0 left-0 w-[100%] h-[100%] opacity-0 updata"
          />
        </div>
        <p className="text-[12px] text-[#999999] mt-1">
          上传格式:jpg,jpeg,png,webp
        </p>
        <p className="text-[12px] text-[#999999]">最大限制2MB</p>
      </div>
      <div className="mt-[20px] ml-10">
        <Form
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<FieldType>
            label="真实姓名"
            name="realName"
            rules={[{ required: true }]}
          >
            <Input className="w-[500px] h-[40px]" placeholder="" />
          </Form.Item>

          <Form.Item<FieldType>
            label="手机号"
            name="mobileNumber"
            rules={[{ required: true }]}
          >
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

export default updata;
