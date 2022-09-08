import React, { Component } from 'react'
import { View, StyleSheet, Text, Modal, TouchableOpacity, Image } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from "react-redux";
import styles from './CustomErrorModalStyle';
import * as IMG_CONST from '../../theme/ImageConstants';
import * as commonActions from '../../redux/actions/commonActions';
import ColorConstants from '../../theme/ColorConstants';

class ApplicationLoader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
        }
    }

    render() {
        if (!this.props.showModal) {
            return null;
          } else {
                return (
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={true}
                        onRequestClose={() => {
                            this.props.hideErrorModal();
                        }}
                    >
                        <TouchableOpacity activeOpacity={1} onPress={() => this.props.hideErrorModal()} style={styles.modalContainer}>
                            <View style={styles.bottomView}>
                                <Text style={[styles.alertText, { color: this.props.isShowError ? ColorConstants.google : ColorConstants.greenish }]}>{this.props.message}</Text>
                                <TouchableOpacity onPress={() => this.props.hideErrorModal()}>
                                    <Image source={IMG_CONST.CROSS_ICON1} style={styles.crossIcon} />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                );
            }      
    }
}



const mapStateToProps = state => {
    return {
        showModal: state.common.showModal,
        message: state.common.message,
        isShowError: state.common.isShowError,
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ApplicationLoader);