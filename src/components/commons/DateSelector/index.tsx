import { Box, Button, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

interface IDateSelector {
    startDate: Date | null | undefined;
    endDate: Date | null | undefined;
    onSetDate: (
        start: Date | null | undefined,
        end: Date | null | undefined
    ) => void;
}

const DateSelector: React.FC<IDateSelector> = ({
    startDate,
    endDate,
    onSetDate,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onChange = (dates: any) => {
        const [start, end] = dates;

        onSetDate(start, end);
    };

    const toggleDatePicker = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    return (
        <Box sx={{ position: 'relative' }}>
            <Button
                variant={'text'}
                // endIcon={<CloseIcon color={'info'} />}
                onClick={toggleDatePicker}
                sx={{
                    height: '34px',
                    padding: '0 10px',
                    display: 'flex',
                    minWidth: '80px',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    border: '1px solid rgba(224, 224, 224, 1)',
                }}
            >
                {startDate && endDate ? (
                    <Typography
                        variant="body1"
                        color="initial"
                        fontWeight={'bold'}
                    >
                        {`${dayjs(startDate).format('YYYY-MM-DD')} ~ ${dayjs(
                            endDate
                        ).format('YYYY-MM-DD')}`}
                    </Typography>
                ) : (
                    <Typography variant="body1" color="initial" fontSize={12}>
                        전체
                    </Typography>
                )}
            </Button>
            {isOpen && (
                <Box
                    sx={{
                        width: '500px',
                        position: 'absolute',
                        top: '40px',
                        left: 0,
                        zIndex: 2,
                    }}
                >
                    <DatePicker
                        selected={startDate}
                        onChange={onChange}
                        startDate={startDate}
                        endDate={endDate}
                        monthsShown={2}
                        isClearable
                        selectsRange
                        inline
                        renderCustomHeader={({
                            date,
                            changeYear,
                            changeMonth,
                            decreaseMonth,
                            increaseMonth,
                            prevMonthButtonDisabled,
                            nextMonthButtonDisabled,
                        }) => (
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                            ></div>
                        )}
                    />
                </Box>
            )}
        </Box>
    );
};

export default DateSelector;
