import { StyleSheet } from "react-native";


const AppStyles = StyleSheet.create({

    container: {
      marginBottom: '10%',
      alignSelf: 'center',
      alignContent: 'center',
      alignItems: 'center',
      width: '100%',
    },

    inputTextView: { 
        fontSize: 16,
        borderColor: 'gray',
        padding: '1%',
        alignSelf: 'center',
        width: '80%',
      },


    text: {
      fontSize: 20,
      color: '#101010',
      marginTop: '50%',
      fontWeight: '600',
      textShadowColor: 'gold'
    },
  
    coverImage: {
        width: 185,
        height: 300,
        borderRadius: 8,
        borderWidth: 5,
        borderColor: 'gray',
        opacity: .6,
      },

    textImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
      },

    listItemText: {
        width:'100%',
        fontWeight: '900',
        fontSize: 30,
        color: 'black',
        alignSelf: 'center',
        textAlign: 'center',
    },
    searchImageAndTextinput: {
      flexDirection: 'row',
      marginTop: '5%',
      marginBottom: '5%',
      borderWidth: 0.5,
      borderColor: 'grey',
      width: '90%',
      alignSelf: 'center',
      borderRadius: 8
    },
    searchImageStyle: {
      width: 20,
      height: 20,
      alignSelf: 'center',
    },
    touchableStyle: {
      alignSelf: 'center',
      margin: '0.5%',
    },
    modalStyle: {
      width:30,
      height:30,
      marginLeft:1, 
      marginVertical:7
    }
  });

export default AppStyles;