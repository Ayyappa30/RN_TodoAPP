import {
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const TodoHome = () => {
  const [todos, SetTodos] = useState([{}]);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      userId: undefined,
      title: '',
      completed: false,
    },
  });

  const submitData = async(data: any) => {
   try{
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos`,{
        method:'POST',
        headers:{"Content-type":"application/json"},
        body: JSON.stringify({
          ...data,
          id: todos.length + 1
        })
      })
      const result:any = await res.json();
      console.log("resultPOst",result)
      SetTodos((prev)=>[...prev,result])
   }catch(err){

   }

    reset({
      userId: undefined,
      title: '',
      completed: false,
    });
  };

  const fetchdata = async (data: any) => {
    console.log('fetch', data.userId);
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/todos?userId=${data.userId}`,
    );
    const result = await res.json();
    SetTodos(result);
  };

  const handleDelete = async(item) =>{
    const data = await fetch(`https://jsonplaceholder.typicode.com/todos/:${item?.id}`,{
      method:"DELETE"
    })
    const red = await data.json()
    SetTodos(red);
  }

 

  const renderItem = (item) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          marginVertical: 10,
          marginTop: 15,
        }}
      >
        <TouchableOpacity
          style={{
            borderBottomWidth: 1,
            borderColor: 'grey',
            height: 40,
            width: '65%',
          }}
        >
          <Text>{item?.title}</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{
              marginHorizontal: 20,
              backgroundColor: 'orange',
              paddingHorizontal: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginHorizontal: 5,
              backgroundColor: 'orange',
              paddingHorizontal: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={()=>handleDelete(item)}
          >
            <Text>delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles?.container}>
      <View style={{ flex: 1, marginTop: 30 }}>
        <View style={styles?.inputBox}>
          <Controller
            control={control}
            name="userId"
            render={({ field: { onChange, value, onBlur } }) => {
              return (
                <TextInput
                  value={value}
                  onChangeText={(text)=>onChange(Number(text))}
                  onBlur={onBlur}
                  placeholder="User ID"
                  placeholderTextColor={'grey'}
                />
              );
            }}
          />
        </View>
        <View style={styles?.inputBox}>
          <Controller
            control={control}
            name="title"
            render={({ field: { value, onChange, onBlur } }) => {
              return (
                <TextInput
                  value={value}
                  placeholder="Title"
                  placeholderTextColor={'grey'}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              );
            }}
          />
        </View>
        <Controller
          control={control}
          name="completed"
          render={({ field: { value, onChange, onBlur } }) => {
            return <Switch value={value} onValueChange={onChange} />;
          }}
        />

        <View>
          <FlatList
            data={todos}
            // keyExtractor={(item: any) => item.id.toString()}
            renderItem={({ item }) => renderItem(item)}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'green',
            paddingHorizontal: 50,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
          }}
          onPress={handleSubmit(fetchdata)}
        >
          <Text style={{ color: 'white' }}>Fetch</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'green',
            paddingHorizontal: 50,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
          }}
          onPress={handleSubmit(submitData)}
        >
          <Text style={{ color: 'white' }}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoHome;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 20,
  },
});
