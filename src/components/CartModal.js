import React from 'react';
import {Modal, TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CartModal = ({visible, onClose}) => {
  return (
    <Modal
      animationType="slide"
      presentationStyle="formSheet"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
          <Text style={{fontSize: 16}}>Xoá</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Xác nhận đơn hàng</Text>
          <MaterialCommunityIcons name='close' size={22} onPress={onClose} />
          </View>
          {/* You can add your cart items and content here */}
          {/* <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text>Close</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </Modal>
  );
};

export default CartModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    width: '100%',
  },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  }
});