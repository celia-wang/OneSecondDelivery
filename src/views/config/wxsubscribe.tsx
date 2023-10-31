import { type FC, useState } from "react";
import { Tabs, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import MsgSetting from "./wxsubComponent/msgSetting";

const Wxsubscribe: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectionType, setSelectionType] = useState<"checkbox" | "radio">(
    "checkbox"
  );
  // const { Option } = Select;
  // 我的模块
  const myTemplate: ColumnsType<any> = [
    {
      title: "tmpID",
      dataIndex: "tmpID",
      render: (text: string) => <a>{text}</a>
    },
    {
      title: "标题",
      dataIndex: "标题"
    },
    {
      title: "说明",
      dataIndex: "说明"
    },
    {
      title: "示例",
      dataIndex: "示例"
    },
    {
      title: "操作",
      dataIndex: "操作"
    }
  ];
  // 公共模块
  const publicTemplate: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "ID"
    },
    {
      title: "标题",
      dataIndex: "标题"
    },
    {
      title: "操作",
      dataIndex: "操作"
    }
  ];
  // tab栏
  const items = [
    {
      key: "1",
      label: "我的模板",
      children: (
        <Table
          rowSelection={{
            type: selectionType
          }}
          columns={myTemplate}
        />
      )
    },
    {
      key: "2",
      label: "公共模板",
      children: (
        <Table
          rowSelection={{
            type: selectionType
          }}
          columns={publicTemplate}
        />
      )
    },
    {
      key: "3",
      label: "消息设置",
      children: <MsgSetting />
    }
  ];

  return (
    <>
      <div className="text-[24px] h-[36px] leading-[36px] font-[500]">
        订阅消息设置
      </div>
      <Tabs defaultActiveKey="1" items={items} />
    </>
  );
};

export default Wxsubscribe;
