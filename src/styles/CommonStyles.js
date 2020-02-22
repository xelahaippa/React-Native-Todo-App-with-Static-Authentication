import {
  StyleSheet,
} from 'react-native';
import { totalSize, width, height } from "react-native-dimension";

export const blueGradient = {
  colors: ['rgb(75,102,234)', 'rgb(130,160,247)'],
  colorsStart: { x: 0.2, y: 0.4 },
  colorsEnd: { x: 1.0, y: 1.0 }
}

export const colors = {
  statusBar: '#46aef7',
  gradient: ['#9f60f7', '#9071fa', '#8680fc', '#7a92fe', '#7aa6fc'],
}

// CommonStyles
export default CommonStyles = StyleSheet.create({
  // Color
  whiteColor: {
    color: '#FFFFFF',
  },
  greyColor: {
    color: 'rgb(105,105,105)',
  },
  lightgreyColor: {
    color: 'rgb(150,150,150)',
  },
  // Form Styles
  textInputField: {
    flexDirection: 'row',
    width: width(90),
    height: 45,
    marginBottom: height(3),
    borderColor: 'rgb(229,229,229)',
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
  },
  textInput: {
    width: width(100) - 55,
    height: 45,
    paddingLeft: 50,
    color: 'rgb(150,150,150)',
    fontSize: totalSize(2),
  },
});
