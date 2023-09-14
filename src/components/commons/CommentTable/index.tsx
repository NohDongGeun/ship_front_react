import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import { IComment } from '../../../models/comment';
import { List } from 'immutable';
import CommentRow from '../CommentRow';

interface ICommentHeader {
    comments: List<IComment>;
}

const CommentTable: React.FC<ICommentHeader> = ({ comments }) => {
    const handleEdit = (id: number) => {
        // Edit 버튼 클릭시 구현할 함수입니다.
    };

    const handleDelete = (id: number) => {
        // Delete 버튼 클릭시 구현할 함수입니다.
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>작성자</TableCell>
                        <TableCell>작성 시간</TableCell>
                        <TableCell>댓글 내용</TableCell>
                        {/* <TableCell>Edit</TableCell> */}
                        <TableCell align={'center'}>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {comments.map((comment) => (
                        <CommentRow
                            key={comment.id}
                            comment={comment}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CommentTable;
