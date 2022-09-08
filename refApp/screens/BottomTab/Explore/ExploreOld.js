import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import R from '../../R'
import { ExploreList } from '../../../theme/constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from './ExploreStyle';
import * as IMG_CONST from '../../../theme/ImageConstants';
import FocusAwareStatusBar from '../../../components/FocusAwareStatusBar';
export default class Explore extends React.Component {


    renderListItem = ({ item }) => {
        return (
            <View>
                <View style={styles.rootContainer}>
                    <TouchableOpacity style={styles.cardContainer}>
                        <View style={styles.mainContainer}>
                            <View style={styles.viewContainer}>
                                <View style={styles.childContainer}>
                                    <Image source={IMG_CONST.BOTTLE} style={styles.bottleImage} />
                                    <View>
                                        <Text style={styles.categoryNameText}>{item.Category}</Text>
                                        <Text style={styles.subText}>
                                            150 Brands available
                                    </Text>
                                    </View>
                                </View>
                                <View style={styles.nextImageContainer}>
                                    <Image source={R.images.next} style={styles.nextImage} />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
    render() {
        return (
            <View>
             <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFF" isFocused={true} />
                <FlatList
                    data={ExploreList}
                    renderItem={this.renderListItem}
                />
            </View>
        );
    }
};
