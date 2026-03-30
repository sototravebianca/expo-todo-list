import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { CheckBox, Input, Button } from '@rneui/themed';

export default function TaskApp() {
  const [tasks, setTasks] = useState([
    { key: '1', description: 'Buy groceries', completed: false },
    { key: '2', description: 'Finish paper', completed: false },
    { key: '3', description: 'Do quiz Ch. 8', completed: true }
  ]);

  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (!newTask.trim()) return;

    const newItem = {
      key: Date.now().toString(),
      description: newTask,
      completed: false
    };

    setTasks([...tasks, newItem]);
    setNewTask('');
  };

  const toggleTask = (key) => {
    setTasks(
      tasks.map((task) =>
        task.key === key
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <CheckBox
        checked={item.completed}
        onPress={() => toggleTask(item.key)}
      />

      <Text
        style={item.completed ? styles.completedText : styles.taskText}
      >
        {item.description}
      </Text>

      {/* Button to mark incomplete tasks as complete */}
      {!item.completed ? (
        <Button
          title="Complete"
          type="outline"
          size="16"
          onPress={() => toggleTask(item.key)}
        />
      ) : (
        <Text style={styles.doneLabel}>Completed</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToDo</Text>

      <View style={styles.inputRow}>
        <Input
          placeholder="Add Task"
          value={newTask}
          onChangeText={setNewTask}
          containerStyle={{ flex: 1 }}
        />
        <Button title="Add" onPress={addTask} />
      </View>

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'lightblue'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10
  },
  taskText: {
    flex: 1,
    fontSize: 16
  },
  completedText: {
    flex: 1,
    fontSize: 16,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  },
  doneLabel: {
    color: 'green'
  },
  notDoneLabel: {
    color: 'gray'
  }
});
