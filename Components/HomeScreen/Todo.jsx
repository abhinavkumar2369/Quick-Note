import React , { useEffect ,useState } from 'react';

import { View, Text , StyleSheet , TextInput , TouchableOpacity , FlatList, Button, ScrollView , Image , Modal , KeyboardAvoidingView, autoComplete, autoCapitalize} from 'react-native';
    
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default function Todo() {
    const [tasks, setTasks] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const ModalView = () => {
        const [taskTitle, setTaskTitle] = useState('');
        const [taskDescription, setTaskDescription] = useState('');
        const addTask = () => {
            if (taskTitle.trim() === '' || taskDescription.trim() === '') return;
            const newTask = { title: taskTitle, description: taskDescription };
            const updatedTasks = [...tasks, newTask];
            setTasks(updatedTasks);
            setTaskTitle('');
            setTaskDescription('');
            toggleModal();
            saveData(updatedTasks);
        };

        return (
          <View style={styles.modalView}>
                {/* ---------- Cross X --------*/}
                <View style = {styles.modalExit}>
                    <TouchableOpacity onPress={toggleModal}>
                        <Image 
                            source={require('../Welcome/images/backScreen.png')} 
                            style={{width: 50, height: 50, marginTop: 10, marginLeft: 10}} 
                        />
                    </TouchableOpacity>
                </View>

                {/* ---------- Text Input --------*/}
                <View style={styles.modalInput}>
                    <View style={styles.modalheading}>
                        <Text>Title</Text>
                        <TextInput 
                            style={styles.modaltexttitle} 
                            placeholder="Your Heading ..." 
                            onChangeText={text => setTaskTitle(text)} 
                            value={taskTitle}
                        />
                    </View>
                    <View >
                        <Text>Description</Text>
                        <TextInput
                            style={styles.modaltextdesc}
                            placeholder="Your Task ..."
                            onChangeText={desc => setTaskDescription(desc)}
                            value={taskDescription}
                            multiline
                            numberOfLines={6}
                            blurOnSubmit={false}
                            autoComplete={autoComplete}
            autoCapitalize={autoCapitalize}
                        />
                    </View>
                    <TouchableOpacity style={styles.addButton} onPress={addTask}>
                        <Text style={styles.addButtonText}>Add Task</Text>
                    </TouchableOpacity>
                </View>
          </View>
        //   </KeyboardAwareScrollView>
        );
      }

    const removeTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        saveData(updatedTasks);
    };

    const saveData = async (tasks) => {
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (error) {
            console.error('Failed to save data', error);
        }
    };
    
    const loadData = async () => {
        try {
            const storedTasks = await AsyncStorage.getItem('tasks');
            if (storedTasks !== null) {
                return JSON.parse(storedTasks);
            }
            return [];
        } catch (error) {
            console.error('Failed to load data', error);
            return [];
        }
    };

    const filteredTasks = tasks.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        const fetchData = async () => {
            const loadedTasks = await loadData();
            setTasks(loadedTasks);
        };
        fetchData();
    }, []);

    // const TaskList = ({ tasks, removeTask }) => {
    //     const renderItem = ({ item, index }) => (
    //       <View style={styles.item}>
    //         <View style={styles.taskContent}>
    //           <Text style={styles.taskTitle}>{item.title}</Text>
    //           <Text style={styles.taskDescription}>{item.description}</Text>
    //         </View>
    //         <TouchableOpacity onPress={() => removeTask(index)}>
    //           <Image source={require('../Welcome/images/delete.png')} style={styles.deleteIcon} />
    //         </TouchableOpacity>
    //       </View>
    //     );
    // }
    
    return (
        <View style={styles.container}>
            <View style={styles.upper}>
                <Image source={require('../Welcome/images/todo.png')} style={{
                    width: 50,
                    height: 50,
                }}/>
                <Text style={styles.upperText}>To-Do List</Text>
            </View>

            <View style={styles.searchContainer}>
                <TextInput 
                    style={styles.searchBar}
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* <View style={styles.heading}>
                <TextInput 
                    style={styles.textinput} 
                    placeholder="Your Task ..." 
                    onChangeText={newText} 
                    value={text}
                />
                <TouchableOpacity 
                    style={styles.plus}
                    onPress={add}>
                    <Text style={styles.plusSymbol}>+</Text>
                </TouchableOpacity>    
            </View> */}

            <View style={styles.list}>
                <ScrollView style={styles.scrollview}>
                    {tasks.length === 0? 
                        <View style={styles.notask}>
                            <Image source={require('../Welcome/images/relax.png')} style={styles.notaskimage}/>
                            <Text style={{
                                textAlign:'center', 
                                fontSize: 20, 
                                color: '#777', 
                                fontWeight:600}}>
                                          No Tasks.....  Relax
                            </Text>
                        </View>:
                    filteredTasks.map((task, index) => (
                        <View key={index} style={styles.item}>
                            <View style={styles.taskContent}>
                                <Text style={styles.taskTitle}>{task.title}</Text>
                                <Text style={styles.taskDescription}>{task.description}</Text>
                            </View>
                            <TouchableOpacity onPress={() => removeTask(index)}>
                                <Image source={require('../Welcome/images/tickdone.png')} style={styles.deleteIcon} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </View>
            
                {/* <FlatList
      data={tasks}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      style={styles.flatList}
    /> */}

            <View style={styles.add}>
                <TouchableOpacity onPress={toggleModal}>
                    <Image 
                    source={require('../Welcome/images/add.png')}
                    style={{width: 60, height: 60}}/>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={toggleModal}>
            <ModalView/>
            </Modal>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        width: '100%',
        flex:1,
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor: 'white',
        // backgroundColor:'green'
    },
    upper:{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: ' flex-start',
        paddingLeft: 15,
        paddingVertical: 20,
        paddingBottom: 25
        // backgroundColor: '#724fff',
    },
    upperText:{
        fontSize: 28,
        fontWeight: 'bold',
        color: '#363853',
        color: 'black',
        textAlign: 'left',
        position: 'relative',
        top: 5,
        marginLeft: 8,
    },
    searchContainer: {
        width: '100%',
        paddingHorizontal: 15,
        paddingBottom: 10,
    },
    searchBar: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#f9f9f9',
    },
    // heading:{
    //     width: '95%',
    //     display: 'flex',
    //     flexDirection: 'row',
    //     justifyContent: 'space-evenly',
    //     alignItems: 'center',
        // borderWidth: 0.5,
        // borderColor: '#777',
        // borderBottomWidth: 0.5,
    //     borderRadius: 8,
    //     marginTop: 5,
    //     marginBottom: 25,
    //     paddingTop: 10,
    //     paddingBottom: 10,
    //     backgroundColor: '#724fff',
    // },
    // textinput:{
    //     borderWidth: 0.5,
    //     padding: 10,
    //     borderColor: '#777',
    //     width: '78%',
    //     backgroundColor: 'white',
    //     borderRadius: 8,
    //     fontSize: 16,
    // },
    // plus:{
    //     width: 40,
    //     height: 40,
    //     backgroundColor: 'white',
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderRadius: 40,
    // },
    // plusSymbol:{
    //     position: 'relative',
    //     top: -3,
    //     fontSize: 32,
    // },
    list:{
        width: '100%',
        // paddingVertical: 10,
        display: 'flex',
        flex:  1,
        flexDirection: 'row',
        justifyContent: 'center',
        // alignItems: 'center',
    },
    scrollview:{
        width: '100%',
        flex: 1,
    },
    item:{
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent : 'space-between',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#777',
        padding: 12,
        paddingVertical: 5,
        marginVertical: 8,
        // backgroundColor: 'lightgrey',
    },
    taskContent:{
        width: '85%',
        // backgroundColor: 'grey',
    },
    taskTitle:{
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 8,
        paddingBottom: 12,
    },
    taskDescription:{
        fontSize: 14,
        color: '#777',
        paddingBottom: 10,
    },
    add:{
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#724fff',
        width: 55,
        height: 55,
        borderRadius: 55,
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
    },
    addText:{
        fontSize: 45,
        color: 'white',
        position: 'relative',
        top: -5,
    },
    modalView: {
        height:'100%',
        minWidth:'100%',
        maxWidth:'100%',
        zIndex: 1,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf:'center',
        backgroundColor:'white',
        borderColor:'black',
        borderWidth: 0.5,
        
    },
    ModalExit:{
        width: '100%',
    },
    deleteIcon:{
        width: 40,
        height: 40,
    },
    // modal
    Exit:{
        fontSize: 24,
        color: 'black',
        paddingLeft: 15,
        paddingTop: 6,
        fontWeight: 'bold',
    },
    modalInput: {
        width: '100%',
        padding: 20,
    },
    modalheading: {
        minWidth: '100%',
        marginBottom: 15,
    },
    modaltexttitle: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
        marginBottom: 15,
    },
    modaltextdesc: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
        marginBottom: 15,
        textAlignVertical:'top'
    },
    addButton:{
        minWidth: '100%',
        backgroundColor: '#724fff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    addButtonText: {
        width:'100%',
        color:'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 3
    },
    notask:{
        maxWidth: '100%',
        display: 'flex',
        alignSelf: 'center',
        marginTop: 50,
        position: 'relative',
        left:-20
    },
    notaskimage:{
        width: 250,
        height: 250,
        alignSelf: 'center',
    }
      
})