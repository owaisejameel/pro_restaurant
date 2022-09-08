import React, { Component, StrictMode, PureComponent} from "react";
import { Text, View, Image } from "react-native";
import * as IMG_CONST from "../theme/ImageConstants";
import scale from "../utils/Scale";
import { createImageProgress } from "react-native-image-progress";
import FastImage from "react-native-fast-image";

const LoadingImage = createImageProgress(FastImage);

export class CachedImage extends Component {
  
  state = { source: this.props.source };
  
  static getDerivedStateFromProps(nextProps, prevState) {
    let ImageFromState = "";
    let Qindex = 0;
    let ImageFromProps = "";
    let Qxindex = 0;

    if(prevState.source && prevState.source.indexOf){
      Qindex = prevState.source.indexOf('?');
    }

    if(nextProps.source && nextProps.source.indexOf){
      Qxindex = nextProps.source.indexOf('?');
    }

    for(let i =0; i < Qindex; i++){
      ImageFromState += prevState.source[i];
    }

    for(let i =0; i < Qxindex; i++){
      ImageFromProps += nextProps.source[i];
    }

    // console.log('lengthofImageFromState >>>> ', lengthofImageFromState);
    // console.log('lengthofImageFromProps >>>> ',lengthofImageFromProps);

    // var lengthofImage = nextProps.source.length;
    // var lengthofImageFromState = prevState.source.length;
    // if (lengthofImage !== lengthofImageFromState) {
    if (ImageFromState !== ImageFromProps) {
      return {
        source: nextProps.source,
      };
    }
    return null;
  }

  renderIndicator = (progress, indeterminate) => {
    return (
      <View style={{ backgroundColor: "#fff" }}>
         {indeterminate ? (
          <Image source={IMG_CONST.LOGO_ICON_GREY} style={this.props.style} />
        ) : (
          <Image source={IMG_CONST.LOGO_ICON_GREY} style={this.props.style} />
          // <Text>{progress * 100}</Text>
        )}
      </View>
    );
  };

  render() {
    return (
      <StrictMode>
        <LoadingImage
          resizeMode={"contain"}
          source={this.state.source ? { uri: this.state.source } :  IMG_CONST.LOGO_ICON_GREY}
          renderError={(error) => console.log(error)}
          renderIndicator={this.renderIndicator}
          style={this.props.style}
        />
      </StrictMode>
    );
  }
}

export default CachedImage;
