import React, { Component } from 'react'
import { Dimensions } from 'react-native';
import Scale from '../../utils/Scale';

const styles = {

    container: {
        width:"100%",
        height:"100%",
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },

    container1: {
        width:"100%",
        height:"100%",
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },

    loader:{
        width: Scale(50),
        height: Scale(50),
    }

}
export default styles;