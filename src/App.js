import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function TodoCalendarApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [date, setDate] = useState(''); 
  const [selectedDate, setSelectedDate] = useState(new Date());

  const addTodo = () => {
    if (input.trim() === '' || date === '') return; 
    const newTodo = {
      id: Date.now(),         
      text: input,            
      dueDate: new Date(date),
      completed: false        
    };
    setTodos(prevTodos => [...prevTodos, newTodo]);
    setInput('');             
    setDate('');              
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const filteredTodos = todos.filter(todo => todo.id !== id);
    setTodos(filteredTodos);
  };

  const tasksForDate = (date) => {
    return todos.filter(todo => {
      const todoDate = new Date(todo.dueDate);
      return (
        todoDate.getFullYear() === date.getFullYear() &&
        todoDate.getMonth() === date.getMonth() &&
        todoDate.getDate() === date.getDate()
      );
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: 'auto' }}>
      <h1>할 일 목록</h1>
      {/* 할 일 추가 폼 */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="할 일을 입력하세요"
          style={{ padding: '8px', width: '60%' }}
        />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={{ padding: '8px', marginLeft: '8px' }}
        />
        <button onClick={addTodo} style={{ padding: '8px', marginLeft: '8px' }}>
          추가
        </button>
      </div>

      {/* 할 일 리스트 렌더링 */}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li
            key={todo.id}
            style={{
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #ccc',
              padding: '8px',
              borderRadius: '4px'
            }}
          >
            <span style={{ flexGrow: 1 }}>
              {todo.text} ({new Date(todo.dueDate).toLocaleDateString()})
              {todo.completed && ' (완료)'}
            </span>
            {/* 완료 여부 토글 버튼 */}
            <button
              onClick={() => toggleTodo(todo.id)}
              style={{ marginLeft: '10px', padding: '6px' }}
            >
              {todo.completed ? '미완료' : '완료'}
            </button>
            {/* 삭제 버튼 */}
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ marginLeft: '10px', padding: '6px' }}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>

      <h2 style={{ marginTop: '40px' }}>캘린더</h2>
      {/* 캘린더 랜더링 */}
      <Calendar
        onChange={(date) => setSelectedDate(date)}
        value={selectedDate}
        tileContent={({ date, view }) => {
          const dayTasks = tasksForDate(date);
          return view === 'month' && dayTasks.length > 0 ? (
            <div style={{ textAlign: 'center', marginTop: '2px', fontSize: '0.8em', color: 'red' }}>
              ●
            </div>
          ) : null;
        }}
      />
      <h3 style={{ marginTop: '20px' }}>
        선택된 날짜: {selectedDate.toDateString()}
      </h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {tasksForDate(selectedDate).length === 0 ? (
          <li>해당 날짜의 할 일이 없습니다.</li>
        ) : (
          tasksForDate(selectedDate).map(todo => (
            <li key={todo.id} style={{ marginBottom: '8px' }}>
              {todo.text} {todo.completed ? '(완료)' : ''}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TodoCalendarApp;