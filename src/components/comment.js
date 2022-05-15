import React from "react";

import { Comment, Avatar, Form, Button, List, Input } from "antd";
import moment from "moment";
import { commentApi } from "../services/comment";
import BaseContext from "../hooks";

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${
      comments.length > 1 ? "comments" : "comment"
    }`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

export default function ListComment(props) {
  const baseCtx = React.useContext(BaseContext);
  const [state, setState] = React.useState({
    comments: [],
    submitting: false,
    value: "",
  });

  // Get all list comments

  React.useEffect(() => {
    setState({ submitting: true, comments: [] });
    (async () => {
      try {
        const response = await commentApi.getList({
          project_id: props.project_id,
        });
        // mapping data
        const comment_content = [];
        if (response.data.results.length !== 0) {
          response.data.results.map((item) => {
            comment_content.push({
              author: item.author,
              avatar: "https://joeschmoe.io/api/v1/random",
              content: <p>{item.content}</p>,
              datetime: moment(item.created_at).format("YYYY-MM-DD"),
            });
          });
        }
        setState({
          comments: comment_content,
          submitting: false,
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [baseCtx.reload]);

  const handleSubmit = async () => {
    if (!state.value) {
      return;
    }

    setState({
      ...state,
      submitting: true,
    });

    // Call api save comment
    try {
      const reponse = await commentApi.add(
        JSON.stringify({
          author: "OWNER",
          content: state.value,
          project_id: props.project_id,
        })
      );

      if (reponse.data.statusCode === 201) {
        baseCtx.changeReload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setState({
      ...state,
      value: e.target.value,
    });
  };

  console.log(state.comments);
  return (
    <>
      {state.comments.length > 0 && <CommentList comments={state.comments} />}
      <Comment
        avatar={
          <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={state.submitting}
            value={state.value}
          />
        }
      />
    </>
  );
}
