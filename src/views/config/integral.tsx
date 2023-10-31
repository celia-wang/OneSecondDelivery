/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { useState, type FC } from "react";
import { Input, Button, Form, message } from "antd";
import { integralData, integralPostData } from "../../service/api";
import { useRequest } from "ahooks";

const Integral: FC = () => {
  // const [msgState, setMsgstate] = useState<boolean>(false);
  // const changeMsg = () => {
  //   if (msgState) {
  //     return message.success("修改成功");
  //   }
  // };
  const { data } = useRequest(async () => await integralData());
  // console.log(data?.data?.data?.withIntegral);
  const [form] = Form.useForm();
  form.setFieldsValue({
    withIntegral: data?.data?.data?.withIntegral ?? ""
  });
  const onSubmit = (value: any) => {
    // console.log(value);
    integralPostData({ ...value })
      .then(() => message.success("修改成功"))
      .catch(() => message.error("修改失败"));
  };
  return (
    <>
      <div className="text-[20px] font-bold-[600] h-[32px] leading-[32px]">
        积分设置
      </div>
      <div className=" w-[100%] flex justify-center">
        <Form
          form={form}
          layout="vertical"
          name="wrap"
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ minWidth: 600 }}
          size="large"
          onFinish={onSubmit}
        >
          <Form.Item
            label="积分抵扣比例"
            name="withIntegral"
            extra="
          输入1000 则表示1000积分可抵扣1元，输入100表示100积分可抵扣1元
        "
          >
            <Input />
          </Form.Item>

          <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
              提交保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Integral;
