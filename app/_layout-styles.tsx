import {StyleSheet, Text, View} from 'react-native';

const layout_styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 20,
        paddingHorizontal: 15,
    },
    input_box : {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    todoList: {
        flex : 1,
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
        backgroundColor: '#fff',
    },
    addButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    dropdown: {
        margin: 16,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
      },
});

export default layout_styles;