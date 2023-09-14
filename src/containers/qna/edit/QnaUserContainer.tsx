import React from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';

const QnaUserContainer: React.FC = () => {
    return (
        <InputWithLabel
            label={'유저 아이디'}
            value={'sam5787@naver.com'}
            readonly={true}
        />
    );
};

export default React.memo(QnaUserContainer);
