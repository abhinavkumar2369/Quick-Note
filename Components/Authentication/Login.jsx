import React , { useState } from 'react';

import { StyleSheet, View , Text, TextInput , TouchableOpacity , Modal , Image} from 'react-native';


export default function Login({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [isloggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const authenticate = () => {
        if (email === 'admin' && password === 'admin') {
            setIsLoggedIn(true);
        }
        else{
            return ;
        }
        navigation.navigate('Home')
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const SignUp = () => {
        return (
          <View style={styles.modalView}>
            <View style = {styles.modalHeading}>
                <Image source={require('../Welcome/images/loginLogo.png')} style={styles.loginLogo}/>
                <Text style={styles.modalLoginHeading}>Create  Account</Text>
                <Text style={styles.modalSubHeading}>Create an account as you can explore of the existing tasks</Text>
            </View>
            {/* ---------- Input Box --------*/}
            <View style={styles.middle}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.modalSignUp} onPress={toggleModal}>
                    <Text style={styles.loginText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            {/* ---------- Cross X --------*/}
            <View style = {styles.modalExit}>
                <TouchableOpacity onPress={toggleModal}>
                    <Text>Already have an account ? Login</Text>
                </TouchableOpacity>
            </View>
          </View>
        );
      }

    return (
        <View style={styles.container}>

            {/* Heading */}
            <View style={styles.heading}>
                {/* <Image 
                    source={require('../Welcome/images/login.png')}
                    style={styles.loginImage}/> */}
                <Text style={styles.loginHeadding}>Login  Here</Text>
                <Text style={styles.loginsubHeading}>Welcome  back  you've  been  missed!</Text>
            </View>

            {/* Input Box */}
            <View style={styles.middle}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                    
                />
                <TouchableOpacity style={styles.loginButton} onPress={authenticate}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
            </View>

            {/* Lower */}
            <TouchableOpacity style={styles.lower} onPress={toggleModal}>
                <Text>Don't have a account </Text>
            </TouchableOpacity>


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={toggleModal}>
                    <SignUp/>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
    },
    loginImage:{
        width: 300,
        height: 300,
    },
    input:{
        borderWidth: 1,
        borderColor: '#3d43f5',
        padding: 10,
        paddingLeft: 20,
        marginVertical: 10,
        borderRadius: 10,
        minWidth: '90%',
    },
    loginButton:{
        padding: 12,
        minWidth: '90%',
        backgroundColor: '#3d43f5',
        borderRadius: 10,
        marginVertical: 30,
    },
    loginText:{
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
    },
    heading:{
        width: '100%',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#3d43f5',
    },
    loginHeadding:{
        width: '100%',
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold', 
        color: '#3d43f5',
        paddingVertical: 15,
    },
    loginsubHeading:{
        width: '100%',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        // color: '#3d43f5',
        color: '#3a415e',
        letterSpacing: 0.3,
        paddingBottom: 15,
    },
    modalView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    modalHeading:{
        width: '100%',
        padding: 20,
    },
    loginLogo:{
        width: 100,
        height: 100,
    },
    modalLoginHeading:{
        width: '100%',
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold',
        color: '#3d43f5',
        paddingVertical: 15,
    },
    modalSubHeading:{
        width: '100%',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#3a415e',
        letterSpacing: 0.3,
    },
    modalSignUp:{
        padding: 12,
        minWidth: '90%',
        backgroundColor: '#3d43f5',
        borderRadius: 10,
        marginVertical: 30,
    },
    

})