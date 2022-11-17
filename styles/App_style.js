import { StyleSheet } from "react-native";


const AppStyles = StyleSheet.create({

    inputTextView: { 
        fontSize: 16,
        borderColor: 'gray',
        padding: '1%',
        alignSelf: 'center',
        width: '80%',
      },

    headView: {
        backgroundColor: '#fff',
        padding: '10%',
        borderRadius: 20
      },

    text: {
      fontSize: 20,
      color: '#101010',
      marginTop: '50%',
      fontWeight: '600',
      textShadowColor: 'gold'
    },
  
    coverImage: {
        width: 200,
        height: 300,
        borderRadius: 5,
        borderBottomEndRadius: 5,
        borderWidth: 5,
        borderColor: 'gray',
        opacity: .6,
        marginBottom: '4%',
      },
    textImage: {
        width: '100%',
        height: '80%',
        paddingVertical: '30%',
        position: 'absolute',
        alignSelf: 'center',
      },
    listItemText: {
        width:'90%',
        fontWeight: '900',
        fontSize: 30,
        fontFamily: 'Calibri',
        color: 'black',
        alignSelf: 'center',
        textAlign: 'center',
    },
    searchImageAndTextinput: {
      flexDirection: 'row',
      marginTop: '5%',
      marginBottom: '5%',
      borderWidth: 1,
      borderWidth: 0.3,
      borderColor: 'grey',
      width: '95%',
      alignSelf: 'center',
      borderRadius: 8
    },
    searchImageStyle: {
      width: 20,
      height: 20,
      marginTop: '1.5%'
    },
    touchableStyle: {
      alignSelf: 'center',
      marginLeft:'2%',
      marginRight:'-2%',
      paddingBottom:'1%',
      display: 'flex',
      background: 'black',
    },
  });

export default AppStyles;