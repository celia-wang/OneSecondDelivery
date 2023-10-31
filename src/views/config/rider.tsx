import { type FC, useState } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import "@wangeditor/editor/dist/css/style.css";
import type * as wangEditor from "@wangeditor/editor";
import { Button, message } from "antd";
import { riderPostData, riderData } from "../../service/api";
import { useRequest } from "ahooks";

const Rider: FC = () => {
  const [editor, setEditor] = useState<wangEditor.IDomEditor | null>(null); // 存储 editor 实例
  const { data } = useRequest(async () => await riderData());
  const onSubmit = (content: string | undefined) => {
    riderPostData(content)
      .then(() => message.success("修改成功"))
      .catch(() => message.error("修改失败"));
  };

  return (
    <>
      <div>
        <div className="text-[24px] font-[500]">骑手指南</div>
        <div
          style={{
            border: "1px solid #ccc",
            // borderRadius: "20px",
            zIndex: 100,
            marginTop: "20px",
            width: "600px"
          }}
        >
          <Toolbar
            editor={editor}
            // defaultConfig={toolbarConfig}
            mode="default"
            style={{ borderBottom: "1px solid #ccc" }}
          />
          <Editor
            // defaultConfig={editorConfig}
            value={data?.data?.data?.content}
            onCreated={(editor) => {
              setEditor(editor);
            }}
            // onChange={(editor) => {
            //   setHtml(editor.getHtml());
            // }}
            mode="default"
            style={{ height: "500px" }}
          />
        </div>
        <Button
          type="primary"
          style={{ marginTop: "20px" }}
          onClick={() => {
            onSubmit(editor?.getHtml());
          }}
        >
          提交保存
        </Button>
      </div>
    </>
  );
};

export default Rider;
