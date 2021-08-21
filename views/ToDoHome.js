import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button, CheckBox} from '../components';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {getTasksAction} from '../redux/actions/todoActions';

const ToDoHome = ({navigation}) => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.task.tasks);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);

  useEffect(() => {
    dispatch(getTasksAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    separateTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  const separateTasks = () => {
    setCompletedTasks(tasks.filter(task => task.isComplete));
    setPendingTasks(
      tasks
        .filter(task => !task.isComplete)
        .sort(function (a, b) {
          a = new Date(a.created);
          b = new Date(b.created);
          return a > b ? -1 : a < b ? 1 : 0;
        }),
    );
  };

  return (
    <Container>
      <ScrollView>
        {completedTasks[0] && (
          <View>
            <Title>Completed Tasks</Title>
            {completedTasks.map((item, index) => (
              <CheckBox key={item.id} data={item} index={index} />
            ))}
          </View>
        )}
        {pendingTasks[0] && (
          <View>
            <Title>Pending Tasks</Title>
            {pendingTasks.map((item, index) => (
              <CheckBox key={item.id} data={item} index={index} />
            ))}
          </View>
        )}
      </ScrollView>

      <ContainerBtnAdd>
        <Button color="#26C06E" onPress={() => navigation.navigate('ToDoForm')}>
          Add a Task
        </Button>
      </ContainerBtnAdd>
    </Container>
  );
};

export default ToDoHome;

const Container = styled.View`
  background-color: #ffffff;
  flex: 1;
`;

const ScrollView = styled.ScrollView`
  padding: 0 25px;
  margin-bottom: 80px;
`;

const ContainerBtnAdd = styled.View`
  height: 80px;
  padding-left: 25px;
  padding-right: 25px;
  justify-content: center;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 22px;
  margin-bottom: 20px;
  margin-top: 20px;
  color: #424141;
`;
