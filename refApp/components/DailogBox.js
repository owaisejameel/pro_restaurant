import React, {useState} from 'react';
import {View, Text, Modal} from 'react-native';

export const DailogBox = ({props}) => {
  const [ShowModal, setShowModal] = useState(false);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      style={{}}>
      <View />
    </Modal>
  );
};
