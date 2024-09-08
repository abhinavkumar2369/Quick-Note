import React , {useEffect , useState} from 'react';
import { StyleSheet, SafeAreaView , View , Button , Text, TextInput , FlatList , Modal , Image , TouchableOpacity } from 'react-native';




export default function Notes() {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
      setModalVisible(!modalVisible);
  };

  const ModalView = () => {
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
      </View>
    );
  }

  return (


    <View style={styles.container}>

      {/* ------ Upper ------ */}
      <View style={styles.upper}>
      <Image source={require('../Welcome/images/notes.png')} style={{
                    width: 60,
                    height: 60,
                }}/>
        <Text style={styles.upperText}>Notes</Text>
      </View>

      {/* ------ Middle ------ */}
      <View style={styles.middle}>
        {/* <Text style={styles.middleText}>Add your notes here</Text> */}
      </View>

      {/* ------ Lower ------ */}
      <View style={styles.lower}>

      </View>


      {/* ------ Add Button ------ */}
      <View style={styles.add}>
          <TouchableOpacity onPress={toggleModal}>
              <Image 
                  source={require('../Welcome/images/add.png')} style={{width: 60, height: 60}}
              />
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
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  upper:{
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: ' flex-start',
    padding: 10,
    // backgroundColor: '#724fff',
  },
  upperText:{
    fontSize: 28,
    fontWeight: 'bold',
    color: '#724fff',
    color: 'black',
    textAlign: 'left',
    position: 'relative',
    top: 10,
    marginLeft: 5,
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
  },
  addText:{
    fontSize: 45,
    color: 'white',
    position: 'relative',
    top: -5,
    // shadowColor:'#724fff',
    // shadowOffset: {
    //   width: 12,
    //   height: 12,
    // },
    // shadowOpacity: 0.8,
    // shadowRadius: 1,
    // elevation: 5,
  },
  modalView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
    // color: 'white',
  },
  ModalExit:{
    width: '100%',
  },
  Exit:{
    fontSize: 24,
    color: 'black',
    paddingLeft: 15,
    paddingTop: 6,
    fontWeight: 'bold',
  },
});