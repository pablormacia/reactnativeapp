import React from "react";
import {View, Button,TextInput} from 'react-native';
import {styles} from './styles';

const AddTask = ({item, onChangeText, placeHolder, addItem,selectionColor, placeholderTextColor, textButton, color}) =>{
    return(
    <View style={styles.inputContainer}>
        <TextInput 
            placeholder={placeHolder}
            style={styles.input} 
            selectionColor = {selectionColor}
            placeholderTextColor = {placeholderTextColor}
            onChangeText={onChangeText} 
            value={item} 
        />
        <Button 
            title={textButton} 
            onPress={addItem} 
            color={color} 
        />
      </View>
    )
}

export default AddTask;