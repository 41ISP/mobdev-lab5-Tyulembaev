import { DarkTheme, DefaultTheme, NavigationIndependentTree, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Button, FlatList, Text, TextInput, View } from 'react-native';
import useTodoStore from '@/shared/useTodoStore';
import { customAlphabet } from 'nanoid/non-secure';
import ITodo from '@/Interfaces/ITodo';
import layout_styles from './_layout-styles';
import Todo from '@/components/Todo';
import { Dropdown } from 'react-native-element-dropdown';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const {todos, addTodo, deleteTodo} = useTodoStore();
  const [titleTodo, setTitleTodo] = useState("") 

  const [filterValue, setFilterValue] = useState<string>("");
  const filters = [
    {'label': "All", 'value':"All"},
    {'label': "Todo", 'value':"Todo"},
    {'label': "Done", 'value':"Done"},
  ]
  
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }


  const onHandleInput = (text : string) => {
    setTitleTodo(text)
  }

  const onDisplayTodo = (item : ITodo) => {
    switch(filterValue)
    {
      case '':
      case 'All':
        return <Todo todo={item}/>
        break;
      case 'Todo':
        if(item.isCompleted === false)
          return <Todo todo={item}/>
        console.log("todo")
        break;
      case 'Done':
        if(item.isCompleted === true)
          return <Todo todo={item}/>
        break;
      default :
        return <Todo todo={item}/>
        break;
    }  

  }

  const createTodo = () => {
    if(titleTodo.trim() === ''){
      alert("Empty task")
      return;
    }
    const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10); 
    console.log(nanoid());
    const todo = {id: nanoid(), title : titleTodo, isCompleted : false} as ITodo
    setTitleTodo("")
    addTodo(todo);
  }

  const styles = layout_styles;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={styles.container}>
        <View style={styles.input_box}>
          <TextInput
              style={styles.input}
              placeholder="Введите задачу"
              value={titleTodo}
              onChangeText={onHandleInput} // Обработка изменения текста
              onSubmitEditing={createTodo} // Отправка по нажатию Enter (на мобильной клавиатуре)
              returnKeyType="done" // Настройка кнопки "Enter" на клавиатуре
          />
          <Button title="Добавить" onPress={createTodo} />
        </View>
        <View>
          <Dropdown
          style={styles.dropdown}
          data={filters}
          labelField="label"
          valueField="value"
          value={filterValue}
          onChange={item => {
              setFilterValue(item.value);
            }}
          />
        </View>
        <View style={styles.todoList}>

        <FlatList
          data={todos}
          extraData={filterValue}
          keyExtractor={(item) => item.id}
          renderItem={(
            {item}
          ) =>{
            switch(filterValue)
            {
              case '':
              case 'All':
                return (<Todo todo={item}/>)
                break;
              case 'Todo':
                if(item.isCompleted === false){
                  console.log('todo')
                  return (<Todo todo={item}/>)
                }
                break;
              case 'Done':
                if(item.isCompleted === true){
                  console.log('done');
                  return (<Todo todo={item}/>)
                }
                break;
            }
            return null
          }}
          />

        </View>
      </View>
    </ThemeProvider>
  );
}
