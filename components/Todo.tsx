import ITodo from "@/Interfaces/ITodo"
import useTodoStore from "@/shared/useTodoStore"
import { FunctionComponent, useState } from "react"
import { Button, StyleSheet, Switch, Text, View } from "react-native"

interface Props {
    todo : ITodo
}


const Todo : FunctionComponent<Props> = ({todo}) => {

    const changeStatus = useTodoStore(state => state.changeStatus);
    const deleteTodo = useTodoStore(state => state.deleteTodo);
    const onHandleCheckbox = () => {
        changeStatus(todo.id);
    }

    const onDeleteTodo = () => {
        deleteTodo(todo.id);
    }

    return (
        <View style={style.Todo}>
            <View style={style.Todo_text}>
                <View><Text>{todo.title}</Text></View>
            </View>
            <View style={style.Todo_tools}>
                <Switch style={style.Todo_tools_checkbox} value={todo.isCompleted} onValueChange={onHandleCheckbox}/>
                <Button title="X" onPress={onDeleteTodo}/>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    Todo : {
        display : 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#FFFFFF',
        marginVertical: 5,
        borderRadius: 5,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    Todo_text : {
        fontSize: 16,
        color: '#333',
        marginLeft: 10,
        flex: 1,
    },
    Todo_tools: {
        flexDirection: 'row',
        alignItems: 'center',  
        justifyContent: 'space-between', 
        paddingVertical: 1, 
        paddingHorizontal: 1,
    },
    Todo_tools_checkbox : {
    
    }
});

export default Todo