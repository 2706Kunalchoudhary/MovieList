import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { colorConstants } from '../utils/constants'

export const CustomInput = (props) => {
  return (
    <View style={[styles.container1,props.style]}>
      <Text style={styles.text1}>Search for a movie</Text>
      <TextInput style={styles.txtInp1} 
      placeholder='Search Movies' 
      placeholderTextColor={colorConstants.white}
      value={props.value}
      onChangeText={props.onChangeText}
      />
    </View>
  )
}


const styles = StyleSheet.create({
    container1:{
        width:responsiveWidth(90),
        height:responsiveHeight(10),
        alignSelf:"center",
        justifyContent:"space-between"
    },
    text1:{
        color:colorConstants.white,
        fontSize:16,
        fontWeight:"400"
    },
    txtInp1:{
        width:responsiveWidth(90),
        height:responsiveHeight(6),
        borderWidth:1,
        borderRadius:24,
        borderColor:colorConstants.neon,
        paddingHorizontal:20,
        fontSize:16,
        color:colorConstants.white
    }
})