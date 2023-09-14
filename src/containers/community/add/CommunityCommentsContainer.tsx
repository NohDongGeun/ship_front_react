import { List } from 'immutable';
import React, { useState } from 'react';
import CommentTable from '../../../components/commons/CommentTable';
import { Comment, IComment } from '../../../models/comment';

const TEST_COMMENT_LIST = List.of(
    new Comment({
        id: 1,
        author: '작성자 1',
        content: '테스트 댓글입니다.',
        createdAt: '2023-05-06',
    }),
    new Comment({
        id: 2,
        author: '작성자 2',
        content: '테스트 댓글입니다.',
        createdAt: '2023-05-06',
    }),
    new Comment({
        id: 3,
        author: '작성자 3',
        content: '테스트 댓글입니다.',
        createdAt: '2023-05-06',
    }),
    new Comment({
        id: 4,
        author: '작성자 4',
        content: '테스트 댓글입니다.',
        createdAt: '2023-05-06',
    }),
    new Comment({
        id: 5,
        author: '작성자 5',
        content: '테스트 댓글입니다.',
        createdAt: '2023-05-06',
    }),
    new Comment({
        id: 6,
        author: '작성자 6',
        content: '테스트 댓글입니다.',
        createdAt: '2023-05-06',
    })
);

const CommunityCommentsContainer: React.FC = () => {
    const [comments, setComments] = useState<List<IComment>>(TEST_COMMENT_LIST);

    return <CommentTable comments={comments} />;
};

export default React.memo(CommunityCommentsContainer);
