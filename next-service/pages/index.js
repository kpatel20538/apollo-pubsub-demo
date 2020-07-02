import React, { useEffect } from "react";
import {
  Box,
  Column,
  Container,
  Heading,
  Loader,
  Message,
  Section,
  Title,
} from "rbx";
import { gql, useQuery } from "@apollo/client";
import FlipMove from "react-flip-move";
import produce from "immer";
import InputForm from "../components/input-form";
import withApollo from "../util/apollo";

const POSTS_QUERY = gql`
  query {
    posts {
      posts {
        id
        author
        created
        comment
      }
      nextCursor
    }
  }
`;

const POST_SUBSCRIPTION = gql`
  subscription {
    postAdded {
      id
      author
      created
      comment
    }
  }
`;

const Index = () => {
  const { data, loading, error, subscribeToMore } = useQuery(POSTS_QUERY);
  useEffect(() => {
    if (!loading) {
      subscribeToMore({
        document: POST_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) =>
          produce(prev, (draft) => {
            const post = subscriptionData?.data?.postAdded;
            if (post) {
              draft.posts.posts.unshift(post);
            }
          }),
      });
    }
  }, [loading]);

  return (
    <Section>
      <Container>
        <Column.Group>
          <Column size="half">
            <InputForm />
          </Column>

          <Column size="half">
            {loading && <Loader size="large" />}
            {error && (
              <Message color="danger">
                <Message.Body>
                  <strong>Error:</strong> Unable to fetch posts
                </Message.Body>
              </Message>
            )}
            <FlipMove>
              {data &&
                data.posts.posts.map((post) => (
                  <Box key={post.id}>
                    <Title>{post.comment}</Title>

                    <Title subtitle>{post.author}</Title>
                    <Heading>{post.created}</Heading>
                  </Box>
                ))}
            </FlipMove>
          </Column>
        </Column.Group>
      </Container>
    </Section>
  );
}

export default withApollo(Index);