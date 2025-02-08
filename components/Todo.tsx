import ITodo from "@/Interfaces/ITodo"
import { Switch, Text, View } from "react-native"

const Todo = (todo : ITodo) => {

    const onHandleCheckbox = () => {
        
    }

    return (
        <div className="Todo">
            <div className="Todo_text">
                <View><Text>{todo.title}</Text></View>
            </div>
            <div className="Todo_checkbox">
                <Switch value={todo.isCompleted} onValueChange={onHandleCheckbox}/>
            </div>
        </div>
    )
}

export default Todo