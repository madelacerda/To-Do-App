import React, {useState} from 'react';
import {Keyboard} from 'react-native';
import {TextInput, Select, Button, DatePicker} from '../components';
import styled from 'styled-components';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {showMessage} from 'react-native-flash-message';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {addTodoAction} from '../redux/actions/todoActions';
import shortid from 'shortid';

const ToDoForm = ({navigation}) => {
  const dispatch = useDispatch();

  const [showDatePicker, setShowDatePicker] = useState({
    dateTime: false,
    timeStart: false,
    timeEnd: false,
  });

  const [todo, settodo] = useState({
    title: '',
    deadline: null,
    startTime: null,
    endTime: null,
    remind: null,
    repeat: null,
  });

  const onChange = (name, value) => {
    setShowDatePicker({
      dateTime: false,
      timeStart: false,
      timeEnd: false,
    });
    settodo({...todo, [name]: value});
  };

  const [errors, setErrors] = useState({
    title: false,
    deadline: false,
    startTime: false,
    endTime: false,
    remind: false,
    repeat: false,
  });

  const validation = () => {
    Keyboard.dismiss();
    if (todo.title.trim() === '') {
      setErrors({...errors, title: true});
      showMessage({
        message: 'All fields are required',
        type: 'danger',
      });
      return;
    }
    if (todo.deadline === null) {
      setErrors({...errors, deadline: true});
      showMessage({
        message: 'All fields are required',
        type: 'danger',
      });
      return;
    }
    if (todo.startTime === null) {
      setErrors({...errors, startTime: true});
      showMessage({
        message: 'All fields are required',
        type: 'danger',
      });
      return;
    }
    if (todo.endTime === null) {
      setErrors({...errors, endTime: true});
      showMessage({
        message: 'All fields are required',
        type: 'danger',
      });
      return;
    } else if (moment(todo.startTime) > moment(todo.endTime)) {
      setErrors({...errors, endTime: true});
      showMessage({
        message: 'The end time cannot be less than the start time',
        type: 'danger',
      });
      return;
    }
    if (todo.remind === null) {
      setErrors({...errors, remind: true});
      showMessage({
        message: 'All fields are required',
        type: 'danger',
      });
      return;
    }
    if (todo.repeat === null) {
      setErrors({...errors, repeat: true});
      showMessage({
        message: 'All fields are required',
        type: 'danger',
      });
      return;
    }
    savetodo();
  };

  const savetodo = () => {
    dispatch(
      addTodoAction({
        ...todo,
        id: shortid.generate(),
        created: new Date(),
        isComplete: false,
      }),
    ).then(
      res => res && navigation.navigate('ToDoHome'),
      showMessage({
        message: 'Task save',
        type: 'success',
      }),
    );
  };

  return (
    <Container>
      <Formulario>
        <Item>
          <Title>Title</Title>
          <TextInput
            error={errors.title}
            placeholder="Design team meeting"
            onChangeText={text => {
              onChange('title', text);
              setErrors({...errors, title: false});
            }}
          />
        </Item>
        <Item>
          <Title>Deadline</Title>
          <DatePicker
            error={errors.deadline}
            placeholder="2021-02-28"
            icon="keyboard-arrow-down"
            onPress={() => {
              setShowDatePicker({...showDatePicker, dateTime: true});
              setErrors({...errors, deadline: false});
            }}
            value={todo.deadline}
            mode="date"
          />
        </Item>
        <ItemTime>
          <ItemTimeLeft>
            <Title>Start time</Title>
            <DatePicker
              error={errors.startTime}
              placeholder="11:00 Am"
              icon="access-time"
              onPress={() => {
                setShowDatePicker({...showDatePicker, timeStart: true}),
                  setErrors({...errors, startTime: false});
              }}
              mode="time"
              value={todo.startTime}
            />
          </ItemTimeLeft>
          <ItemTimeRight>
            <Title>End time</Title>
            <DatePicker
              error={errors.endTime}
              placeholder="14:00 Pm"
              icon="access-time"
              onPress={() => {
                setShowDatePicker({...showDatePicker, timeEnd: true});
                setErrors({...errors, endTime: false});
              }}
              value={todo.endTime}
              mode="time"
            />
          </ItemTimeRight>
        </ItemTime>
        <Item>
          <Title>Remind</Title>
          <Select
            error={errors.remind}
            placeholder={{
              label: '10 minutes early.',
              value: null,
              color: '#C6C5C6',
            }}
            onValueChange={value => {
              onChange('remind', value);
              setErrors({...errors, remind: false});
            }}
            items={[
              {label: '10 minutes early', value: '10 minutes early'},
              {label: '30 minutes early', value: '30 minutes early'},
              {label: '1 hour early', value: '1 hour early'},
              {label: '2 hours early', value: '2 hours early'},
              {label: '5 hours early', value: '5 hours early'},
            ]}
            selectedValue={todo.remind}
          />
        </Item>
        <Item>
          <Title>Repeat</Title>
          <Select
            error={errors.repeat}
            placeholder={{
              label: 'Weekly.',
              value: null,
              color: '#C6C5C6',
            }}
            onValueChange={value => {
              onChange('repeat', value);
              setErrors({...errors, repeat: false});
            }}
            items={[
              {label: 'Daily', value: 'Daily'},
              {label: 'Weekly', value: 'Weekly'},
              {label: 'Monthly', value: 'Monthly'},
              {label: 'Annual', value: 'Annual'},
            ]}
            selectedValue={todo.repeat}
          />
        </Item>
      </Formulario>
      <ContainerBtnAdd>
        <Button color="#26C06E" onPress={validation}>
          Create a Task
        </Button>
      </ContainerBtnAdd>
      {showDatePicker.dateTime && (
        <RNDateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={(event, value) => {
            onChange('deadline', value);
            setErrors({...errors, deadline: false});
          }}
        />
      )}
      {showDatePicker.timeStart && (
        <RNDateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode="time"
          is24Hour
          display="default"
          onChange={(event, value) => {
            onChange('startTime', value);
            setErrors({...errors, startTime: false});
          }}
          maximumDate={new Date()}
        />
      )}
      {showDatePicker.timeEnd && (
        <RNDateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode="time"
          is24Hour
          display="default"
          onChange={(event, value) => {
            onChange('endTime', value);
            setErrors({...errors, endTime: false});
          }}
          maximumDate={new Date()}
        />
      )}
    </Container>
  );
};

export default ToDoForm;

const Container = styled.View`
  flex: 1;
  background-color: #f8f9f9;
`;

const Formulario = styled.ScrollView`
  padding-left: 23px;
  padding-right: 23px;
  padding-top: 20px;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 14px;
`;

const ContainerBtnAdd = styled.View`
  height: 80px;
  padding-left: 25px;
  padding-right: 25px;
  justify-content: center;
`;

const Item = styled.View`
  height: 90px;
  justify-content: space-around;
  padding-top: 5px;
  padding-bottom: 5px;
`;
const ItemTime = styled.View`
  flex-direction: row;
  height: 90px;
`;

const ItemTimeLeft = styled.View`
  flex: 1;
  padding-right: 5px;
  justify-content: space-around;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const ItemTimeRight = styled.View`
  flex: 1;
  padding-left: 5px;
  justify-content: space-around;
  padding-top: 5px;
  padding-bottom: 5px;
`;
