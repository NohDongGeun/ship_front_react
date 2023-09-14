import React from 'react';
import { TableCell, TableRow, Button } from '@mui/material';
import { IComment } from '../../../models/comment';
import { styled } from '@mui/system';

interface CommentRowProps {
    comment: IComment;
    handleEdit: (id: number) => void;
    handleDelete: (id: number) => void;
}

const CommentContentCell = styled(TableCell)(({ theme }) => ({
    width: '50%',
}));

const ActionCell = styled(TableCell)(({ theme }) => ({
    width: '100px',
}));

const CommentRow: React.FC<CommentRowProps> = ({
    comment,
    handleEdit,
    handleDelete,
}) => {
    return (
        <TableRow>
            <TableCell>{comment.author}</TableCell>
            <TableCell>{comment.createdAt}</TableCell>
            <CommentContentCell>{comment.content}</CommentContentCell>{' '}
            {/* <ActionCell>
                <Button onClick={() => handleEdit(comment.id)}>Edit</Button>
            </ActionCell> */}
            <ActionCell>
                <Button onClick={() => handleDelete(comment.id)}>Delete</Button>
            </ActionCell>
        </TableRow>
    );
};

export default CommentRow;
