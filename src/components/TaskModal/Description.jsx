import { useRef } from "react";
import styles from "./taskModal.module.css";
import { Editor } from "@tinymce/tinymce-react";

const Description = ({ description, setDescription }) => {
  const editorRef = useRef(description || null);

  const handleEditorChange = () => {
    const content = editorRef.current.getContent();
    setDescription(content);
  };
  console.log(description, "description");
  return (
    <div className={styles.DescriptionParent}>
      <Editor
        apiKey="6g9gmh0sl4t00q0elcc5x44dz2jcrnr3ccpc31g7n583mywe"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={
          description === "" || description != null || description !== undefined
            ? description
            : "<p></p>"
        }
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist",
            "anchor",
            "autolink",
            "help",
            "image",
            "link",
            "lists",
            "searchreplace",
            "table",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onChange={handleEditorChange}
      />
      {/* <button onClick={log}>Log editor content</button> */}
    </div>
  );
};

export default Description;
