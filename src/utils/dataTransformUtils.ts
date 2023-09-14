import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

const CAREER_DATA = [
    { id: 1, name: '5년 미만', value: 'UNTIL_FIVE_YEAR' },
    { id: 2, name: '5년 이상 ~ 10년 미만', value: 'UNTIL_TEN_YEAR' },
    { id: 3, name: '10년 이상 ~ 20년 미만', value: 'UNTIL_TWENTY_YEAR' },
    { id: 4, name: '20년 이상 ~ 30년 미만', value: 'UNTIL_THIRTY_YEAR' },
    { id: 5, name: '30년 이상', value: 'OVER_THIRTY_YEAR' },
];

const MATCHING_STATUS_DATA = [
    { id: 1, name: '매칭 대기', value: 'MATCHING_STANDBY' },
    { id: 1, name: '매칭 수락', value: 'MATCHING_ACCEPT' },
    { id: 1, name: '매칭 연결', value: 'MANAGER_CONNECT' },
    { id: 1, name: '매칭 완료', value: 'MATCHING_COMPLETE' },
    { id: 1, name: '매칭 취소', value: 'MATCHING_CANCLE' },
];

export const QNA_STATUS_DATA = [
    { id: 1, name: '답변준비', value: 'QNA_STANDBY' },
    { id: 2, name: '답변완료', value: 'QNA_COMPLETE' },
    { id: 3, name: '답변취소', value: 'QNA_CANCLE' },
];

dayjs.extend(utc);
dayjs.extend(timezone);

export const getStatus = (activate: boolean): string => {
    return activate ? '활성화' : '비활성화';
};

export const getDate = (date: string): string => {
    const utcDate = dayjs.utc(date);
    const koreaDate = utcDate.tz('Asia/Seoul');
    const formattedDate = koreaDate.format('YYYY-MM-DD');
    return formattedDate ? formattedDate : '';
};

export const getCareer = (careerEnum: string): string => {
    const career = CAREER_DATA.find((item) => item.value === careerEnum);

    return career ? career.name : '';
};

export const isEmptyObject = (object: Object) => {
    if (!object) return true;

    return Object.keys(object).length <= 0;
};

export const getMatchingStatus = (matchingStatus: string): string => {
    const status = MATCHING_STATUS_DATA.find(
        (item) => item.value === matchingStatus
    );

    return status ? status.name : '';
};

export const getQnaStatus = (qnaStatus: string): string => {
    const status = QNA_STATUS_DATA.find((item) => item.value === qnaStatus);

    return status ? status.name : '';
};

export const hasDataResponseContent = (data: any) => {
    return data && data.success && data.response && data.response.content;
};

export const hasDataResponse = (data: any) => {
    return data && data.success && data.response;
};
