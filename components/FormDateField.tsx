import { View, Text } from 'react-native'
import React, { useState } from 'react'
import CustomButton from './CustomButton/CustomButton'
import DateTimePicker from '@react-native-community/datetimepicker';


interface FormDateFieldProps {
    title?: string,
    handleChangeDate: (date: Date) => void,
    otherStyles?: string,
    value: any
}


const FormDateField = ({
    title,
    handleChangeDate,
    otherStyles,
    value
}: FormDateFieldProps) => {

    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState<any>('date');
    const [show, setShow] = useState(false);


    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        handleChangeDate(currentDate)
    };

    const showMode = (currentMode: any) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className='text-base text-gray-100 font-medium'>{title}</Text>

            <CustomButton handlePress={showDatepicker} title={'Start date'} />
            <CustomButton handlePress={showTimepicker} title={'Start Time'} />

            <Text>selected: {date.toLocaleString()}</Text>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={value}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                    minimumDate={new Date}
                />
            )}
            <Text>{date.toLocaleString()}</Text>
        </View>
    )
}

export default FormDateField