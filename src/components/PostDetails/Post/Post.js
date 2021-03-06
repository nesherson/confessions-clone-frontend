import { createRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import FeatherIcon from 'feather-icons-react';

import { parseDate } from '../../../util/helpers';

import PostComments from './PostComments/PostComments';

const Container = styled.div`
  margin: 0 0 10px 0;
  border-left: 1px solid rgba(136, 136, 136, 0.25);
  border-right: 1px solid rgba(136, 136, 136, 0.25);
  background-color: #15202b;
  transition: background-color 0.2s ease;
  min-width: 390px;
`;

const PostWrapper = styled.div`
  padding: 10px 15px 0 15px;
  border-bottom: 1px solid rgba(136, 136, 136, 0.25);
  background-color: #15202b;
  transition: background-color 0.2s ease;
  @media only screen and (max-width: 620px) {
    padding: 10px 2% 0 2%;
  }
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PostId = styled.span`
  color: #bccedc;
  font-size: 0.9rem;
`;

const PostDate = styled.span`
  color: #bccedc;
  font-size: 0.9rem;
`;

const PostText = styled.p`
  color: #fff;
  font-size: 1.25rem;
`;

const StyledSpan = styled.span`
  color: #bccedc;
  font-size: 1.05rem;
  margin-right: 10px;
`;

const SocialStats = styled.div`
  margin: 0;
  padding: 15px 0;
  border-top: 1px solid rgba(136, 136, 136, 0.25);
`;

const Span = styled.span`
  color: #fff;
  padding-left: 3px;
  font-weight: bold;
`;

const Icons = styled.div`
  margin: 0;
  padding: 15px 0;
  display: flex;
  justify-content: space-evenly;
  border-top: 1px solid rgba(136, 136, 136, 0.25);
`;

const Icon = styled(FeatherIcon)`
  margin: 0 25px;
  stroke: #bccedc;
  &:hover {
    stroke: #8aa9c1;
  }
`;

const Post = ({
  id,
  date,
  children,
  likes,
  dislikes,
  comments,
  like,
  dislike,
}) => {

  const [showComments] = useState(true);
  const [showNewCommentForm, setShowNewCommentForm] = useState(false);

  const history = useHistory();
  const newCommentRef = createRef(null);

  const handleShowNewCommentForm = () => {
    if (showNewCommentForm) {
      setShowNewCommentForm(false);
    } else {
      setShowNewCommentForm(true);
    }
  };

  const scrollToNewComment = () => {
    if (!showNewCommentForm) {
      handleShowNewCommentForm();
    }
    newCommentRef.current.scrollIntoView();
  };

  return (
    <>
      <Container>
        <PostWrapper
          onClick={() => {
            history.push(`/post/${id}`);
          }}
        >
          <PostHeader>
            <PostId>{id}</PostId>
            <PostDate>{parseDate(date)}</PostDate>
          </PostHeader>
          <PostText>{children}</PostText>
          <SocialStats>
            <StyledSpan>
              Likes: <Span>{likes}</Span>{' '}
            </StyledSpan>
            <StyledSpan>
              Dislikes: <Span>{dislikes}</Span>
            </StyledSpan>
            <StyledSpan>
              Comments: <Span>{comments.length}</Span>
            </StyledSpan>
          </SocialStats>
          <Icons>
            <Icon
              icon='thumbs-up'
              size='20'
              onClick={() => {
                like(id);
              }}
            />
            <Icon
              icon='thumbs-down'
              size='20'
              onClick={() => {
                dislike(id);
              }}
            />
            <Icon
              icon='message-square'
              size='20'
              onClick={scrollToNewComment}
            />
          </Icons>
        </PostWrapper>
        {showComments ? (
          <PostComments
            postId={id}
            comments={comments}
            ref={newCommentRef}
            showNewCommentForm={showNewCommentForm}
            handleShowNewCommentForm={handleShowNewCommentForm}
          />
        ) : null}
      </Container>
    </>
  );
};

export default Post;
