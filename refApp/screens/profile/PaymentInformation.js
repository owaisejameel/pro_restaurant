import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { RootView } from '../../components/RootView';
import R from '../../R';
import GreenButton from '../../components/GreenButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SimpleTextInput } from '../../components/SimpleTextInput';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';


export default class PaymentInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 4 }}>
                    <ScrollView>
                        <Text>Saved Cards</Text>
                    </ScrollView>

                </View>
                <View style={{ flex: 0.5, alignSelf: 'center' }}>
                    <GreenButton
                        title="Add New Card"
                        customStyle={{
                            width: wp('90%'),
                            height: hp('7%'),
                            marginTop: hp('2.5%'),
                            backgroundColor: R.colors.greenButton
                            // marginHorizontal: 30,
                        }}
                        customTxtStyle={{
                            fontSize: hp('2.5%'),
                            fontFamily: R.fonts.GTWalsheimProMedium
                        }}
                    //   onPress={() =>
                    //       this.props.navigation.navigate('')
                    //   }
                    />
                </View>
                <View style={{ flex: 0.2 }}>

                </View>
            </View>
        )
    }
}
