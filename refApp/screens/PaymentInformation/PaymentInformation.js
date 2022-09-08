/**
 * Payment Information Screen
 */
import React , { Component } from 'react';
import { 
    View, 
    Image,
    Text,
    FlatList,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import COLOR_CONST from '../../../app/theme/ColorConstants';
import * as STR_CONST from '../../../app/theme/StringConstants';
import { FONTS } from '../../../app/theme/ColorConstants';
import * as IMG_CONST from '../../../app/theme/ImageConstants';
import LinearGradient from 'react-native-linear-gradient';
import styles from './PaymentInformationStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swipeout from 'react-native-swipeout';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';

class PaymentInformation extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            savedCardList: [
                {
                    id: 1,
                    cardNo: '1234 3452 3476 9812',
                    cardHolder: 'Rituraj Mandloi',
                    expiry: '12/25'
                },
                {
                    id: 2,
                    cardNo: '1234 1252 2376 9812',
                    cardHolder: 'Virendra Samrat',
                    expiry: '12/30'
                },
            ]
        }
    }
    
    componentDidMount() {
       this.setNavigationHeaderConfiguration();
    }

    setNavigationHeaderConfiguration = () => {
        this.props.navigation.setOptions({
            title: STR_CONST.PAYMENT_INFORMATION,
            headerStyle: { backgroundColor: COLOR_CONST.white },
            headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Payment Information</Text></View>),
            headerLeft: () => (<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.backButton}><Image source={IMG_CONST.BACK_ICON}style={styles.backIcon}/></TouchableOpacity>),
        })
    }

    onAddCard = (item) => {
        let localCardList = this.state.savedCardList;
        localCardList.push(item);
        this.setState({ savedCardList: localCardList });
    }

    renderSavedCardCell = (item, index) => {
        return (
            <View style={styles.shadowView}>
                <LinearGradient colors={[COLOR_CONST.secondaryThemeColor, COLOR_CONST.secondaryThemeColor]} style={styles.cardContainer}>
                    <Image 
                        source={IMG_CONST.VISA_ICON}
                        style={styles.visaImage}
                        resizeMode="cover"
                    />
                    <Text style={styles.cardNumber}>{STR_CONST.CARD_NUMBER}</Text>
                    <Text style={styles.cardNo}>{item.cardNo}</Text>
                    <View style={styles.row}>
                        <Text style={styles.cardHolder}>{STR_CONST.CRAD_HOLDER}</Text>
                        <Text style={styles.expires}>{STR_CONST.EXPIRES}</Text>
                    </View>
                    <View style={styles.bottomRow}>
                        <Text style={styles.cardHolderName}>{item.cardHolder}</Text>
                        <Text style={styles.date}>{item.expiry}</Text>
                    </View>
                </LinearGradient>
            </View>
        )
    }

    renderSavedCardList = () => {
        return (
            <View style={styles.listContainer}>
                <Text style={styles.savedCards}>{STR_CONST.SAVED_CARDS}</Text>
                <FlatList 
                    data={this.state.savedCardList}
                    extraData={this.state}
                    renderItem={({ item, index }) => this.renderSavedCardCell(item, index)}
                />
                <TouchableOpacity onPress={() => this.props.navigation.navigate('NewCardScreen', { onAddCard: (item) => this.onAddCard(item)})}>
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[COLOR_CONST.primaryThemeGradient, COLOR_CONST.secondaryThemeGradient, COLOR_CONST.secondaryThemeGradient]} style={styles.continueShoppingButton}>
                        <Text style={styles.continueText}>{'ADD NEW CARD'}</Text>
                    </LinearGradient>
                </TouchableOpacity>
        </View>
        )
    }
    
    render() {
        return (
        <View style={styles.container}>
             <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFF" isFocused={true} />
            {this.renderSavedCardList()}
        </View>
        );
    }
};

export default PaymentInformation;

