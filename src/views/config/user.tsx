import { useState, type FC } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import "@wangeditor/editor/dist/css/style.css";
import type * as wangEditor from "@wangeditor/editor";
import { Button, message } from "antd";
import { userData, userPostData } from "../../service/api";
import { useRequest } from "ahooks";

const User: FC = () => {
  const [editor, setEditor] = useState<wangEditor.IDomEditor | null>(null); // 存储 editor 实例

  // const [html, setHtml] = useState<string | undefined>("");
  const { data } = useRequest(async (data) => {
    // setHtml(data?.data?.data?.content);
    return await userData();
  });
  const onSubmit = async (content: string | null) => {
    await userPostData(content)
      .then(() => message.success("修改成功"))
      .catch(() => message.error("修改失败"));
  };

  // const toolbarConfig = {};
  // const editorConfig = {
  //   placeholder: "请输入内容..."
  // };
  // 及时销毁 editor ，重要！
  // useEffect(() => {
  //   return () => {
  //     if (editor == null) return;
  //     editor.destroy();
  //     setEditor(null);
  //   };
  // }, [editor]);

  return (
    <>
      <div>
        <div className="text-[24px] font-[500]">用户指南</div>
        <div
          style={{
            border: "1px solid #ccc",
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
            // value={html}
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
            onSubmit(editor!.getHtml()).catch(() => message.error("修改失败"));
          }}
        >
          提交保存
        </Button>

        {/* <div style={{ marginTop: "15px" }}>{html}</div> */}
      </div>
    </>
  );
};

export default User;
