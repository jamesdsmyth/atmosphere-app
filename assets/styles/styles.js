import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window');
const constants = {
  purple: '#5d2497', // -10 - -1
  blue: '#2f358f', // 0 -5
  lightBlue: '#0a56a2', // 6 - 10
  lightGreen: '#1aa79d', // 11 - 15
  green: '#c9da55', // 16 - 20
  yellow: '#fef036', // 21 - 25
  lightOrange: '#fec42e', // 26 - 30
  orange: '#fd9326', // 31 - 35
  darkOrange: '#f16631', // 36 - 40
  red: '#eb212f', // 41 - 50,
  white: '#ffffff'
}
const styles = StyleSheet.create({
  container: {
    flex: 10,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: window.width
  },
  section: {
    width: window.width,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: '#fff'
  },
  sectionInner: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sectionNow: {
    backgroundColor: '#83c359',
    flex: 5,
    borderTopWidth: 0
  },
  sectionFull: {
    flex: 10
  },
  sectionHide: {
    flex: 0
  },
  sectionLater: {
    backgroundColor: '#c4d24a',
    flex: 1
  },
  backgroundImage: {
    width: 100,
    height: 100,
    backgroundColor: constants.white
  },

  section90: {
    backgroundColor: constants.purple
  },
  section91: {
    backgroundColor: constants.purple
  },
  section92: {
    backgroundColor: constants.purple
  },
  section93: {
    backgroundColor: constants.purple
  },
  section94: {
    backgroundColor: constants.purple
  },
  section95: {
    backgroundColor: constants.purple
  },
  section96: {
    backgroundColor: constants.purple
  },
  section97: {
    backgroundColor: constants.purple
  },
  section98: {
    backgroundColor: constants.purple
  },
  section99: {
    backgroundColor: constants.purple
  },
  
  section0: {
    backgroundColor: constants.blue
  },
  section1: {
    backgroundColor: constants.blue
  },
  section2: {
    backgroundColor: constants.blue
  },
  section3: {
    backgroundColor: constants.blue
  },
  section4: {
    backgroundColor: constants.blue
  },
  section5: {
    backgroundColor: constants.blue
  },

  section6: {
    backgroundColor: constants.lightBlue
  },
  section7: {
    backgroundColor: constants.lightBlue
  },
  section8: {
    backgroundColor: constants.lightBlue
  },
  section9: {
    backgroundColor: constants.lightBlue
  },
  section10: {
    backgroundColor: constants.lightBlue
  },

  section11: {
    backgroundColor: constants.lightGreen
  },
  section12: {
    backgroundColor: constants.lightGreen
  },
  section13: {
    backgroundColor: constants.lightGreen
  },
  section14: {
    backgroundColor: constants.lightGreen
  },
  section15: {
    backgroundColor: constants.lightGreen
  },

  section16: {
    backgroundColor: constants.green
  },
  section17: {
    backgroundColor: constants.green
  },
  section18: {
    backgroundColor: constants.green
  },
  section19: {
    backgroundColor: constants.green
  },
  section20: {
    backgroundColor: constants.green
  },

  section21: {
    backgroundColor: constants.yellow
  },
  section22: {
    backgroundColor: constants.yellow
  },
  section23: {
    backgroundColor: constants.yellow
  },
  section24: {
    backgroundColor: constants.yellow
  },
  section25: {
    backgroundColor: constants.yellow
  },

  section26: {
    backgroundColor: constants.lightOrange
  },
  section27: {
    backgroundColor: constants.lightOrange
  },
  section28: {
    backgroundColor: constants.lightOrange
  },
  section29: {
    backgroundColor: constants.lightOrange
  },
  section30: {
    backgroundColor: constants.lightOrange
  },

  section31: {
    backgroundColor: constants.orange
  },
  section32: {
    backgroundColor: constants.orange
  },
  section33: {
    backgroundColor: constants.orange
  },
  section34: {
    backgroundColor: constants.orange
  },
  section35: {
    backgroundColor: constants.orange
  },

  section36: {
    backgroundColor: constants.darkOrange
  },
  section37: {
    backgroundColor: constants.darkOrange
  },
  section38: {
    backgroundColor: constants.darkOrange
  },
  section39: {
    backgroundColor: constants.darkOrange
  },
  section40: {
    backgroundColor: constants.darkOrange
  },

  section40: {
    backgroundColor: constants.red
  },
  section41: {
    backgroundColor: constants.red
  },
  section42: {
    backgroundColor: constants.red
  },
  section43: {
    backgroundColor: constants.red
  },
  section44: {
    backgroundColor: constants.red
  },
  section45: {
    backgroundColor: constants.red
  },

  section46: {
    backgroundColor: constants.red
  },
  section47: {
    backgroundColor: constants.red
  },
  section48: {
    backgroundColor: constants.red
  },
  section49: {
    backgroundColor: constants.red
  },
  section50: {
    backgroundColor: constants.red
  },
  
  sectionText: {
    fontSize: 20,
    color: constants.white,
    lineHeight: 50
  },
  loadingText: {
    fontSize: 20,
    color: constants.lightGreen
  },
  warningText: {
    fontSize: 20,
    color: constants.red
  }
});

export default styles;