export const ACTIVATE_LIST = [
    { id: 1, name: '활성화', value: 'true' },
    { id: 2, name: '비활성화', value: 'false' },
];

export const ACTIVATE_LIST_WITH_ALL = () => {
    return [{ id: 0, name: '전체', value: 'ALL' }, ...ACTIVATE_LIST];
};
