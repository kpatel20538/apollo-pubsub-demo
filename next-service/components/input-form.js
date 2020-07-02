import React, { useState } from "react";
import { 
  Button, 
  Control, 
  Field, 
  Input, 
  Label, 
  Textarea, 
  Title 
} from "rbx";
import { gql, useMutation } from "@apollo/client";

const POST_MUTATION = gql`
  mutation($author: String, $comment: String) {
    addPost(author: $author, comment: $comment) {
      id
      author
      created
      comment
    }
  }
`;

export default () => {
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");
  const [mutate, { loading }] = useMutation(POST_MUTATION);
  return (
    <>
      <Title>SSR Verision</Title>
      <Field>
        <Label>Author</Label>
        <Control>
          <Input
            type="text"
            placeholder="Jane Done"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </Control>
      </Field>
      <Field>
        <Label>Comment</Label>
        <Control>
          <Textarea
            placeholder="Lorem Ipsum"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Control>
      </Field>
      <Field>
        <Control>
          <Button
            state={loading ? "loading" : null}
            color="primary"
            onClick={() => {
              mutate({
                variables: {
                  author: author || "Jane Done",
                  comment: comment || "Lorem Ipsum",
                },
              });
            }}
          >
            Submit
          </Button>
        </Control>
      </Field>
    </>
  );
};
