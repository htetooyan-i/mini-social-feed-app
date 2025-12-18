import React from 'react';
import { View, StyleSheet } from 'react-native';

import Button from './Button';

type ImagePickerButtonPorps = {
    buttonLabel: string,
    onClick: () => void
}

function ImagePickerButton( { buttonLabel, onClick } : ImagePickerButtonPorps) {

    return (
        <View>
            <Button title={buttonLabel} onPress={onClick} />
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        marginTop: 12,
    }
})

export default ImagePickerButton;