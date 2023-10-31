/*
wangshuxian
消息设置
 */

import { type FC, useState } from "react";
import { Form, Select, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";

// 创建拖拽柄
const DragHandle = SortableHandle(() => (
  <MenuOutlined style={{ cursor: "grab", color: "#999" }} />
));
// 拖拽项容器
const SortableItem: any = SortableElement((props: any) => (
  <div className=" sortableBorder w-[300px] h-[30px]    mb-[8px] rounded-[4px] flex justify-between items-center  ">
    {props.children}
    <DragHandle />
  </div>
));
// 创建拖拽根容器
const SortableBody: any = SortableContainer((props: any) => (
  <div>{props.children}</div>
));
const MsgSetting: FC = () => {
  // const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6"];
  const [items, setItems] = useState([
    "订单号",
    "物品描述",
    "状态",
    "创建时间",
    "服务类型(帮我送/帮我取/帮我买)",
    "下单时间"
  ]);
  const [secItems, setSecItems] = useState([
    "审核结果",
    "审核时间",
    "拒绝理由"
  ]);
  // 导入arrayMoveImmutable排序方法，从 onSortEnd 解构 oldIndex newIndex进行排序
  const onSortEnd = ({
    oldIndex,
    newIndex
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    const i = arrayMoveImmutable(items, oldIndex, newIndex);
    setItems(i);
  };
  const onSortSec = ({
    oldIndex,
    newIndex
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    const i = arrayMoveImmutable(secItems, oldIndex, newIndex);
    setSecItems(i);
  };
  return (
    <div className="w-[100%] flex justify-center">
      <Form
        layout="vertical"
        name="control-ref"
        style={{ maxWidth: 600 }}
        size="large"
      >
        <Form.Item
          name="gender"
          label="用户订单通知"
          rules={[{ required: true }]}
          style={{ width: "500px" }}
        >
          <Select placeholder="" allowClear></Select>
        </Form.Item>
        <div className="text-[12px] text-[#999] mt-[12px] h-[40px] leading-[40px]">
          请对齐以下参数
        </div>
        <Form.Item name="DragHandle">
          <SortableBody onSortEnd={onSortEnd}>
            {items.map((value, index) => (
              <SortableItem key={`item-${value}`} index={index}>
                {value}
              </SortableItem>
            ))}
          </SortableBody>
        </Form.Item>

        <Form.Item name="gender" label="跑男审核通知">
          <Select
            placeholder=""
            // onChange={onGenderChange}
            allowClear
          ></Select>
        </Form.Item>
        <div className="text-[12px] text-[#999] mt-[12px] h-[40px] leading-[40px]">
          请对齐以下参数
        </div>
        <Form.Item name="DragHandle">
          <SortableBody onSortEnd={onSortSec}>
            {secItems.map((value, index) => (
              <SortableItem key={`item-${value}`} index={index}>
                {value}
              </SortableItem>
            ))}
          </SortableBody>
        </Form.Item>
        <Form.Item>
          <Button type="primary">提交保存</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MsgSetting;
