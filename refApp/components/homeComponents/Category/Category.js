import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { CategoryList } from '../../../theme/constants';
import styles from './CategoryStyle';
import * as IMG_CONST from '../../../theme/ImageConstants';
import LoadingImage from 'react-native-image-progress';
import CachedImage from '../../CachedImage';
export const Category = (props) => {
const renderIndicator = (progress, indeterminate) => {
    return(
      <View style={{backgroundColor:'#fff'}}>
        {indeterminate?(<Image source={IMG_CONST.LOGO_ICON} style={styles.categoryImage}/>)
        :(<Text>{progress * 100}</Text>)}
      </View>
    )
  }
  const renderListItem = (item, index) => {
      return (
        <TouchableOpacity onPress={() => props.onPressProductListing(item)} style={styles.categoryContainer}>
            <View style={styles.categoryView}>

            <CachedImage
                resizeMode={"contain"}
                source={item.image}
                renderError={(error)=>console.log(error)}
                renderIndicator={renderIndicator}
                style={styles.categoryImage}
              />
            {/* <LoadingImage
                resizeMode={"contain"}
                source={{uri: item.image}}
                renderError={(error)=>console.log(error)}
                renderIndicator={renderIndicator}
                style={styles.categoryImage} 
               
              /> */}
              {/* <Image source={{uri: item.image}} style={styles.categoryImage} /> */}
            </View>
            {/* <Text style={styles.categoryText}>{item.name}</Text> */}
        </TouchableOpacity>
      );
  };

  return (
    <View style={styles.container}>
      <View style={styles.categoryRow}>
        <Text style={styles.featured}>Shop by Category</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('Explore')}>
          <Text style={styles.viewAllText}>View all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          numColumns={3}
          data={props.categoryList}
          renderItem={({ item, index }) => renderListItem(item, index)}
        />
      </View>
    </View>
  );
};
