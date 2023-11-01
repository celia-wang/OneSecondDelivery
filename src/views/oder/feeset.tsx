import { Icon } from "@iconify/react";
import { Button, Form, InputNumber, message } from "antd";
import { useRequest } from "ahooks";
import type { FC } from "react";

import {
  getAdminConfigOrderFee,
  getTipOptionsConfiguration
} from "@/service/api";

const Feeset: FC = () => {
  const { data: TipOptionsConfigurationData } = useRequest(
    getAdminConfigOrderFee
  );

  const onFinish = (values: any) => {
    getTipOptionsConfiguration({ ...values })
      .then(() => message.success("修改成功"))
      .catch((err) => message.error("修改失败" + err.message.message));
  };
  return TipOptionsConfigurationData != null ? (
    <>
      <div className="text-[24px] font-500 ">小费配置</div>
      <div className="px-[50px] mt-[20px] w-[600px] h-[300px]">
        <div className="text-[#333] text-[14px] h-[40px] leading-[40px]">
          小程序端展示的小费选项:
        </div>
        <Form
          name="dynamic_form_item"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          initialValues={{
            feeTips: TipOptionsConfigurationData?.data.data.feeTips,
            platformExtract:
              TipOptionsConfigurationData?.data.data.platformExtract,
            agentExtract: TipOptionsConfigurationData?.data.data.agentExtract
          }}
        >
          <Form.List name="feeTips">
            {(fields, { add, remove }, { errors }) => (
              <>
                <Form.Item>
                  {fields.map((field) => (
                    <Form.Item
                      required={false}
                      key={field.key}
                      className="flex"
                    >
                      <div className="flex">
                        <Form.Item
                          {...field}
                          validateTrigger={["onChange", "onBlur"]}
                          noStyle
                        >
                          <InputNumber
                            size="large"
                            style={{ width: "500px", height: "40px" }}
                            placeholder="请输入小费金额"
                          />
                        </Form.Item>
                        {/* 判断大于0出现删除标志并且点击删除 */}
                        {fields.length > 1 ? (
                          <Icon
                            icon="ant-design:delete-outlined"
                            color="white"
                            width="32"
                            height="32"
                            className="dynamic-delete-button ml-[12px] bg-[red] rounded-[50%]"
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        ) : null}
                      </div>
                    </Form.Item>
                  ))}
                </Form.Item>
                {/* 删除 */}
                <Form.Item>
                  <Button
                    onClick={() => {
                      add();
                    }}
                    style={{ width: "22%" }}
                    className="flex items-center h-[40px]"
                  >
                    <Icon
                      icon="material-symbols:add"
                      width="16"
                      height="16"
                      className="mr-[5px]"
                    />
                    添加一项
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item name="platformExtract">
            <div className="h-[80px] mb-[24px]">
              <div className="h-[40px] leading-[40px]">平台抽成:</div>
              <InputNumber
                size="large"
                name="platformCommission"
                defaultValue={
                  TipOptionsConfigurationData?.data.data.platformExtract
                }
                style={{ width: "100%" }}
              />
            </div>
          </Form.Item>
          <Form.Item name="agentExtract">
            <div className="h-[80px] mb-[24px]">
              <div className="h-[40px] leading-[40px]">代理抽成:</div>
              <InputNumber
                size="large"
                name="agencyCommission"
                defaultValue={
                  TipOptionsConfigurationData?.data.data.agentExtract
                }
                style={{ width: "100%" }}
              />
            </div>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-[88px] h-[40px] bg-[#955ce6] text-[#fff] mb-[40px]"
            >
              提交保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  ) : null;
};

export default Feeset;
