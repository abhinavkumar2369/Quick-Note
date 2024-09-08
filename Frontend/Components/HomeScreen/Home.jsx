import React from 'react';
import { View , Text , StyleSheet , Image , TouchableOpacity , FlatList , Dimensions, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Notes from './Todo';
import Todo from './Notes';

const Tab = createBottomTabNavigator();

export default function Home() {
    return(
        <Tab.Navigator 
                screenOptions={{ headerShown: false,
                    tabBarStyle: { height: 60 , borderTopWidth: 0.1 , borderTopColor: 'gray' , backgroundColor: 'white' },
                    tabBarActiveTintColor: 'blue',
                    tabBarInactiveTintColor: 'gray', 
                    tabBarShowLabel: false,
                    // scrollEnabled: true,
                    // ScrollView: { backgroundColor: 'transparent' },
                }} 
                style={styles.container}>
            <Tab.Screen 
                name="Todo" 
                component={Notes} 
                style={styles.heading}  
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" color={color} size={size} />
                    ),
                }}/>
            <Tab.Screen 
                name="Notes" 
                component={Todo} 
                style={styles.heading}  
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="list" color={color} size={size} />
                    ),
                }}
                />
        </Tab.Navigator>
    )
}


const styles = StyleSheet.create({
    

})