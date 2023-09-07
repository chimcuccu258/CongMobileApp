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
      <View>
        <View style={styles.modalHeader}>
          <Text style={{fontSize: 16}}>Xoá</Text> 
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Xác nhận đơn hàng
          </Text>
          <MaterialCommunityIcons name="close" size={22} onPress={onClose} />
        </View>
        <View style={styles.modalContent}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Sản phẩm đã chọn</Text>
        </View>
      </View>
    </Modal>
  );
};

export default CartModal;

const styles = StyleSheet.create({
  modalContainer: {
    // flex: 1,
    // backgroundColor: 'white',
  },
  modalContent: {
    // backgroundColor: 'gray',
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    marginTop: 20,
    paddingHorizontal: 20,
    // width: '100%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 0.3,
  },
});
