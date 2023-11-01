import { Icon } from "@iconify/react";
import { Button, Form, Input, InputNumber, Space, message } from "antd";
import { type FC } from "react";
import { useRequest } from "ahooks";
import {
  ChangeAdminConfigOrderCancel,
  getAdminConfigOrderCancel
} from "@/service/api";

const Cancelset: FC = () => {
  const { data: AdminConfigOrderCancel } = useRequest(
    getAdminConfigOrderCancel
  );
  const onFinish = (values: Res.TAdminConfigOrderCancel) => {
    ChangeAdminConfigOrderCancel({ ...values })
      .then(() => message.success("修改成功"))
      .catch((err) => message.error("修改失败" + err.message.message));
  };

  return AdminConfigOrderCancel != null ? (
    <>
      <div className="text-[24px] font-500">取消订单配置</div>
      <div className="px-[50px] mt-[20px] w-[600px] h-[300px]">
        <Form
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          autoComplete="off"
          layout="vertical"
          initialValues={{
            userCancelRules: AdminConfigOrderCancel?.data.data.userCancelRules,
            riderCancelRules:
              AdminConfigOrderCancel?.data.data.riderCancelRules,
            userCancelTips: AdminConfigOrderCancel?.data.data.userCancelTips,
            riderCancelTips: AdminConfigOrderCancel?.data.data.riderCancelTips,
            adminCancelTips: AdminConfigOrderCancel?.data.data.adminCancelTips,
            agentCancelTips: AdminConfigOrderCancel?.data.data.agentCancelTips
          }}
        >
          <div className="text-[#333] text-[14px] h-[40px] leading-[40px]">
            用户取消订单规则:
          </div>
          <div className="text-[12px] text-[#999] h-[40px] leading-[40px] mb-[10px]">
            用户在订单状态为【已接单、配送中】时取消订单会触发此规则
          </div>
          <Form.List name="userCancelRules">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <div className="flex items-center justify-between text-[14px]">
                      <Form.Item
                        name={[name, "timeRange"]}
                        label="时间范围(分钟):"
                        {...restField}
                      >
                        <div className="flex mr-[20px] w-[300px]">
                          <InputNumber
                            min={0}
                            className="w-[130px]"
                            defaultValue={
                              AdminConfigOrderCancel?.data.data.userCancelRules[
                                key
                              ]?.timeRange[0]
                            }
                          />
                          <div className="mx-[5px]"> ~ </div>
                          <InputNumber
                            min={0}
                            className="w-[130px]"
                            defaultValue={
                              AdminConfigOrderCancel?.data.data.userCancelRules[
                                key
                              ]?.timeRange[1]
                            }
                          />
                        </div>
                      </Form.Item>
                      <Form.Item
                        label="超时费用比例:"
                        {...restField}
                        name={[name, "price"]}
                      >
                        <InputNumber min={0} className="mr-[20px] w-[90px]" />
                      </Form.Item>
                      <Icon
                        icon="ant-design:delete-outlined"
                        color="white"
                        width="32"
                        height="32"
                        className="dynamic-delete-button ml-[12px] bg-[red] rounded-[50%]"
                        onClick={() => {
                          remove(name);
                        }}
                      />
                    </div>
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                  >
                    添加一项
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <div className="text-[#333] text-[14px] h-[40px] leading-[40px]">
            骑手取消订单规则:
          </div>
          <div className="text-[12px] text-[#999] h-[40px] leading-[40px] mb-[10px]">
            骑手在订单状态为【已接单、配送中】时取消订单会触发此规则
          </div>
          <Form.List name="riderCancelRules">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <div className="flex items-center justify-between text-[14px]">
                      <Form.Item
                        name={[name, "timeRange"]}
                        label="时间范围(分钟):"
                        {...restField}
                      >
                        <div className="flex mr-[20px] w-[300px]">
                          <InputNumber
                            min={0}
                            className="w-[130px]"
                            defaultValue={
                              AdminConfigOrderCancel?.data.data
                                .riderCancelRules[key]?.timeRange[0]
                            }
                          />
                          <div className="mx-[5px]"> ~ </div>
                          <InputNumber
                            min={0}
                            className="w-[130px]"
                            defaultValue={
                              AdminConfigOrderCancel?.data.data
                                .riderCancelRules[key]?.timeRange[1]
                            }
                          />
                        </div>
                      </Form.Item>
                      <Form.Item
                        label="超时费用比例:"
                        {...restField}
                        name={[name, "price"]}
                      >
                        <InputNumber min={0} className="mr-[20px] w-[90px]" />
                      </Form.Item>
                      <Icon
                        icon="ant-design:delete-outlined"
                        color="white"
                        width="32"
                        height="32"
                        className="dynamic-delete-button ml-[12px] bg-[red] rounded-[50%]"
                        onClick={() => {
                          remove(name);
                        }}
                      />
                    </div>
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                  >
                    添加一项
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <div className="text-[#333] text-[14px] h-[40px] leading-[40px]">
            用户取消订单选项配置:
          </div>
          <Form.List name="userCancelTips">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <div className="flex text-[14px]">
                      <Form.Item {...restField}>
                        <Input
                          className="w-[410px] mr-[20px]"
                          defaultValue={
                            AdminConfigOrderCancel?.data.data.userCancelTips[
                              key
                            ] as string
                          }
                        />
                      </Form.Item>
                      <Icon
                        icon="ant-design:delete-outlined"
                        color="white"
                        width="32"
                        height="32"
                        className="dynamic-delete-button ml-[12px] bg-[red] rounded-[50%]"
                        onClick={() => {
                          remove(name);
                        }}
                      />
                    </div>
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                  >
                    添加一项
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <div className="text-[#333] text-[14px] h-[40px] leading-[40px]">
            骑手取消订单选项配置:
          </div>
          <Form.List name="riderCancelTips">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <div className="flex text-[14px]">
                      <Form.Item {...restField}>
                        <Input
                          className="w-[410px] mr-[20px]"
                          defaultValue={
                            AdminConfigOrderCancel?.data.data.riderCancelTips[
                              key
                            ]
                          }
                        />
                      </Form.Item>
                      <Icon
                        icon="ant-design:delete-outlined"
                        color="white"
                        width="32"
                        height="32"
                        className="dynamic-delete-button ml-[12px] bg-[red] rounded-[50%]"
                        onClick={() => {
                          remove(name);
                        }}
                      />
                    </div>
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                  >
                    添加一项
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <div className="text-[#333] text-[14px] h-[40px] leading-[40px]">
            管理员取消订单选项配置:
          </div>
          <Form.List name="adminCancelTips">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <div className="flex text-[14px]">
                      <Form.Item {...restField}>
                        <Input
                          className="w-[410px] mr-[20px]"
                          defaultValue={
                            AdminConfigOrderCancel?.data.data.adminCancelTips[
                              key
                            ]
                          }
                        />
                      </Form.Item>
                      <Icon
                        icon="ant-design:delete-outlined"
                        color="white"
                        width="32"
                        height="32"
                        className="dynamic-delete-button ml-[12px] bg-[red] rounded-[50%]"
                        onClick={() => {
                          remove(name);
                        }}
                      />
                    </div>
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                  >
                    添加一项
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <div className="text-[#333] text-[14px] h-[40px] leading-[40px]">
            代理取消订单选项配置:
          </div>
          <Form.List name="agentCancelTips">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <div className="flex text-[14px]">
                      <Form.Item {...restField}>
                        <Input
                          className="w-[410px] mr-[20px]"
                          defaultValue={
                            AdminConfigOrderCancel?.data.data.agentCancelTips[
                              key
                            ]
                          }
                        />
                      </Form.Item>
                      <Icon
                        icon="ant-design:delete-outlined"
                        color="white"
                        width="32"
                        height="32"
                        className="dynamic-delete-button ml-[12px] bg-[red] rounded-[50%]"
                        onClick={() => {
                          remove(name);
                        }}
                      />
                    </div>
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                  >
                    添加一项
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-[88px] h-[40px] bg-[#955ce6] text-[#fff]  mb-[40px]"
            >
              提交保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  ) : null;
};

export default Cancelset;
