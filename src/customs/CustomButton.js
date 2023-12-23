import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { colorConstants } from '../utils/constants'

export const CustomButton = (props) => {
  return (
    <Pressable style={[styles.container1,props.style]} onPress={props.onPress}>
        <Text style={styles.text1}>{props.btnTxt}</Text>
    </Pressable>
  )
}


const styles = StyleSheet.create({
    container1:{
        width:50,
        height:50,
        backgroundColor:colorConstants.neon,
        borderRadius:25,
        alignSelf:"center",
        justifyContent:"center",
        alignItems:"center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    text1:{
        color:colorConstants.white,
        fontSize:14,
        fontWeight:"400"
    }
})