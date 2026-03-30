import { useState } from 'react';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlateList } from 'react-native';
import { CheckBox, Input, Button } from '@rneui/themed';
import { add } from 'react-native/types_generated/Libraries/Animated/AnimatedExports';

import React, { useState } from "react";

export default function TaskApp() {
  const [tasks, setTasks] = useState([
    { key: 1, description: "Buy groceries", completed: false },
    { key: 2, description: "Finish paper", completed: false },
    { key: 3, description: "Do quiz Ch. 8", completed: true }
  ]);

  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;

    const newItem = {
      key: Date.now(),
      description: newTask,
      completed: false
    };

    setTasks([...tasks, newItem]);
    setNewTask("");
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

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          ToDo
        </h1>

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Add Task"
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.key}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.key)}
                />

                {/* Task name + completion styling */}
                <span
                  style={
                    task.completed
                      ? {
                          textDecorationLine: 'line-through',
                          textDecorationStyle: 'solid'
                        }
                      : {}
                  }
                  className="text-gray-800"
                >
                  {task.description}
                </span>
              </div>

              {/* Visual indicator of completion (still visible) */}
              <span className={`text-sm font-medium ${task.completed ? 'text-green-500' : 'text-gray-400'}`}>
                {task.completed ? 'Completed' : 'Not done'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
