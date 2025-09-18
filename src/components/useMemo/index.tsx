import { useMemo, useState } from 'react';
import { Button, Text, View } from 'react-native';

const expensiveCalculation = (num:number) => {
  console.log("Calculating...");
  for (let i = 0; i < 1000000000; i++) {
    num += 1;
  }
  return num;
};

const UseMemoCom = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState<string[]>(['']);
  const calculation = expensiveCalculation(count);

  
  const increment = () => {
    setCount((c) => c + 1);
  };
  const addTodo = () => {
    setTodos((t) => [...t, "New Todo"]);
  };

  return (
    <View>
      <View>
        <Text>My Todos</Text>
        {todos.map((todo, index) => {
          return <Text key={index}>{todo}</Text>;
        })}
        <Button onPress={addTodo} title='Add Todo'/>
      </View>
      {/* <hr /> */}
      <View>
        <Text>Count: {count}</Text>
        <Button onPress={increment} title='+'/>
        <Text>Expensive Calculation</Text>
        <Text>{calculation}</Text>
        <Text>Note that this example executes the expensive function also when you click on the Add Todo button.</Text>
      </View>
    </View>
  );
};


export default UseMemoCom
