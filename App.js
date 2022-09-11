import { StyleSheet, Text, View, TextInput, Button, Dimensions, FlatList, TouchableOpacity, Modal } from 'react-native';
import React, {useState} from 'react';

import { CustomModal,AddTask } from './components';

//const {height,width} = Dimensions.get("screen");
//console.warn(height)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //justifyContent: 'center',
    //alignItems: 'center',
  },

  
  itemList:{
    flex:1,
    marginVertical:20,
    marginHorizontal: 20,

  },
  itemContainer:{
    marginVertical: 5,
    justifyContent:'space-between',
    flexDirection:'row',
  },
  item:{
    fontSize: 16,
    color: '#212121'
  },
  modalContainer:{
    justifyContent:'space-between',
    alignItems: 'center',
    paddingVertical: 20
  },
  modalMessageContainer: {
    justifyContent:'space-between',
    alignItems: 'center'
  },
  modalMessage:{
    fontSize:14
  },
  selectedTask:{
    fontSize:16
  },
  buttonContainer:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal:20,
  }
});


export default function App() {
  const [task,setTask] = useState('');
  const [tasks,setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  //console.warn(tasks)

  const onHandleChangeText = (text) => {
      setTask(text);
  }

/*   const addItem = () =>{
    setTasks([
      ...tasks,
      {
        id: Math.random().toString(),
        value: task
      }
    ]);
    setTask('');
  } */

  const addItem = () =>{
    setTasks((prevTasks) =>[
      ...prevTasks,
      {
        id: Date.now().toString(),
        value: task
      }
    ]);
    setTask('');
  }

  const onHandleModal= (id)=>{
    setModalVisible(!modalVisible);
    setSelectedTask(tasks.find((item)=>item.id === id))
  }

  const onHandleDeleteItem = (id) => {
    setTasks(tasks.filter((item)=>item.id !== selectedTask.id))
    setSelectedTask(null)
    setModalVisible(!modalVisible);

  }

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.item}>{item.value}</Text>
      <TouchableOpacity onPress={()=>onHandleModal(item.id)}>
        <Text style={styles.delete}>x</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.container}>
      <AddTask 
        item={task}
        onChangeText={onHandleChangeText}
        placeHolder='new task'
        addItem={addItem}
        selectionColor='#4A306D'
        placeholderTextColor='#4A306D'
        textButton='Add'
        color='#4A306D'
      />

      {/* <View style={styles.itemList}>
          {tasks.map((item) =>(
            <View key={`item-${item.id}`} style={styles.itemContainer}>
                <Text style={item}>{item.value}</Text>
            </View>
          ))}
      </View> */}
      <FlatList
        style={styles.itemList}
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
      <CustomModal modalVisible={modalVisible} animationType='slide'>
        <View style={styles.modalContainer}>
            <Text>Detalle de la lista</Text>
        </View>
        <View style={styles.modalMessageContainer}>
          <Text style={styles.modalMessage}>¿Estás seguro que quieres eliminar el siguiente elemento?</Text>
        </View>
        <View style={styles.modalMessageContainer}>
          <Text style={styles.selectedTask}>{selectedTask?.value}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button title='Eliminar' onPress={()=>onHandleDeleteItem(selectedTask?.id)} />
          <Button title='Cancelar' onPress={()=>setModalVisible(!modalVisible)} />
        </View>
      </CustomModal>
    </View>
  );
}

