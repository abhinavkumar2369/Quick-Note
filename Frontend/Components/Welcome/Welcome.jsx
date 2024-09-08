import React, { useState } from 'react';
import { StatusBar, StyleSheet , Text, View , TouchableOpacity , FlatList , Image , Dimensions } from "react-native";


const { width } = Dimensions.get('window');
import icon from './images/icon.png';



const image_data = [
    {
      id: '1',
      image: require('./images/image_1.png'),
      title: 'Welcome to Quick Note!',
      subtitle: 'Start adding your tasks and make things happen.',
    },
    {
      id: '2',
      image: require('./images/image_2.png'),
      title: 'Easily Make To-Do\'s !',
      subtitle: 'Set your goals, track your progress, and achieve your goals!',
    },
    {
      id: '3',
      image: require('./images/image_3.png'),
      title: 'Enjoy your experience!',
      subtitle: 'Organize your day, optimize your life.',
    }
];

const renderItem = ({ item }) => {
    return (
        <View style={styles.itemContainer}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
    )
}


const flatListRef = React.createRef();



export default function Welcome({navigation}) {

    const [currentIndex, setCurrentIndex] = useState(0);

    const onMomentumScrollEnd = (event) => {
        const newIndex = Math.floor(event.nativeEvent.contentOffset.x / width);
        setCurrentIndex(newIndex);
    };

    
    return (
        <View style={styles.container}>

            {/* ---------------- Upper ----------------*/}
            <View style={styles.upper}>
                <View style={styles.icon}>
                    <View style={styles.iconLeft}>
                        <Image source={icon} style={styles.iconImage}/>
                    </View>
                    <View style={styles.iconRight}>
                        <Text style={styles.iconName}>Quick Note</Text>
                    </View>
                </View>
            </View>

            {/* ---------------- Middle ----------------*/}
            <View style={styles.middle}>
                <FlatList
                data={image_data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                ref={flatListRef}
                onMomentumScrollEnd={onMomentumScrollEnd}
                style={{ width: width }}
                />
                    <View style={styles.flatlistindicator}>
                        <View style={currentIndex === 0 ? styles.dotactive : styles.dotinactive}></View>
                        <View style={currentIndex === 1 ? styles.dotactive : styles.dotinactive}></View>
                        <View style={currentIndex === 2 ? styles.dotactive : styles.dotinactive}></View>
                    </View>
            </View>

            {/* --------------- Lower ------------------*/}
            <View style={styles.lower}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.getStarted}>
                    <Text style={styles.button}>Get  Started</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    upper:{
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        paddingTop: 20,
        minHeight: 120,
        maxHeight: 120,   
        // backgroundColor: '#3d43f5',
    },
    icon:{
        height: 150,
        minHeight: 150,
        maxHeight: 150,
        flexDirection: 'row',
        // backgroundColor:'green' ,
        justifyContent:'center',
        alignContent: 'center',
    },
    iconLeft:{
        flex: 4,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // backgroundColor: 'red'
    },
    iconRight:{
        flex: 6,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // backgroundColor: 'blue'
    },
    iconImage:{
        height:70,
        width:70,
        marginRight: 8,
    },
    iconName:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#2d2d2d',
        letterSpacing: 0,
    },
    middle:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'yellow',
    },
    image:{
        height: 280,
        width: '90%',
        resizeMode: 'contain',
        marginVertical: 20,
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#2d2d2d',
        color: '#3d43f5',
        textAlign: 'center',
        // textShadowColor: 'rgba(0, 0, 2, 1)',
        // backgroundColor: 'green',
    },
    subtitle:{
        // backgroundColor: 'red',
        fontSize: 14,
        color: '#62656b',
        paddingBottom: 80,
        paddingHorizontal: 50,
        textAlign: 'center',
        lineHeight: 20,
        // fontWeight: 'bold',
    },
    lower:{
        minHeight: 100,
        maxHeight: 100,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        width: '100%',
    },
    itemContainer: {
        width,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    getStarted:{
        width: '90%',
        backgroundColor: '#3d43f5',
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 20,
        activeOpacity: 0.7, 
    },
    button:{
        // fontFamily: 'Roboto',
        fontWeight: '500',
        color: 'white',
        fontSize: 20,
        letterSpacing: 0.5,
    },
    flatListRef:{
        width: '100%',
        height: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    flatlistindicator: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
    },
    dotactive:{
        minHeight: 15,
        minWidth: 30,
        maxHeight: 15,
        maxWidth: 15,
        // fontSize: 60,
        backgroundColor: '#3d43f5',
        borderRadius: 30,
        marginHorizontal: 5,
    },
    dotinactive:{
        minHeight: 15,
        minWidth: 15,
        maxHeight: 15,
        maxWidth: 15,
        backgroundColor: '#d9d9d9',
        fontSize: 30,
        borderRadius: 30,
        marginHorizontal: 5,
    },
    
})