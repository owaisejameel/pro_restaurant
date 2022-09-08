import React from 'react';
import { View, Text, SafeAreaView, TextInput, Image, TouchableOpacity } from 'react-native';
import R from '../../R';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import * as IMG_CONST from '../../theme/ImageConstants';
import * as STR_CONST from '../../theme/StringConstants';
import scale, { verticalScale } from '../../utils/Scale';
import COLOR_CONST from '../../../app/theme/ColorConstants';
import { FONTS } from '../../../app/theme/ColorConstants';
import styles from './LocationStyle';
export default class Location extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.setNavigationHeaderConfiguration();
    }

    setNavigationHeaderConfiguration = () => {
        this.props.navigation.setOptions({
            headerStyle: { backgroundColor: COLOR_CONST.white, shadowColor: 'transparent', elevation: 0 },
            headerLeft: () => (<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.backButton}><Image source={IMG_CONST.BACK_ICON} style={styles.backIcon} /></TouchableOpacity>),
        })
    }

    renderViewAll = () => {
        return (
            <View>
                <View style={{ backgroundColor: COLOR_CONST.white }}>
                    <TextInput
                        TextInput
                        style={styles.TextInputStyle}
                        placeholder="Enter a Location"
                        autoFocus={true}
                        underlineColorAndroid="transparent"
                    />
                </View>

                <View style={styles.currentLocationStyles}>
                    <View style={styles.currentLocation}>
                        <View>
                            <Text style={styles.MyLocation}>Detect my Location</Text>
                            <Text style={styles.UsingLocation}>Using GPS</Text>
                        </View>
                        <TouchableOpacity>
                            <Image source={R.images.compasslocation} style={styles.imagesstyle} />
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={styles.RecentSearch}>Recent Searches</Text>
                <View style={styles.LocationContainer}>
                    <View style={{ marginLeft: scale(20) }}>
                        <Text style={styles.loactionName}>Kearny, United States</Text>
                        <View style={styles.borderLine} />
                        <Text style={styles.loactionName}>New York, United States</Text>
                        <View style={styles.borderLine} />
                        <Text style={styles.loactionName}>Manhattan, United States</Text>
                        <View style={styles.borderLine} />
                        <Text style={styles.loactionName}>El Paso, Mexico</Text>
                        <View style={styles.borderLine} />
                        <Text style={styles.loactionName}>Coahuila, Mexico</Text>
                    </View>
                </View>

                <Text style={styles.ThatsAll}>That’s all</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView>
                    <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFF" isFocused={true} />
                    {this.renderViewAll()}
                </KeyboardAwareScrollView>
            </View>
        );
    };
}
