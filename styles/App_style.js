import { StyleSheet } from "react-native";


const AppStyles = StyleSheet.create({

    inputTextView: { 
        fontSize: 16,
        borderColor: 'black',
        padding: '1%',
        alignSelf: 'center',
        width: '96%',
      },

    headView: {
        backgroundColor: '#fff',
        padding: '10%',
        borderRadius: 20
      },

    container: {
      flex: 1,
      backgroundColor: '#f8f8f8',
      alignItems: 'center'
    },
    text: {
      fontSize: 20,
      color: '#101010',
      marginTop: '50%',
      fontWeight: '600',
      textShadowColor: 'gold'
    },
    listItem: {
      marginTop: '3%',
      padding: '2%',
      alignSelf: 'center',
      backgroundColor: '#fff',
      width: '50%'
    },
    coverImage: {
        width: 180,
        height: 260,
        borderRadius: 5,
        borderBottomEndRadius: 5,
        borderWidth: 5,
        borderColor: 'whitesmoke',
        opacity: 0.7,
        marginBottom: '4%',
      },
    textImage: {
        width: '90%',
        paddingTop: '50%',
        position: 'absolute',
        textAlign: 'center',
        paddingLeft: '2%'
      },
    listItemText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
    },
    searchImageAndTextinput: {
      flexDirection: 'row',
      marginTop: '5%',
      borderWidth: 1,
      borderWidth: 0.5,
      borderColor: 'grey',
      width: '95%',
      alignSelf: 'center'
    },
    searchImageStyle: {
        padding: '3.8%',
        padddingTop:'3.7%',
    },
    touchableStyle: {
      alignSelf: 'center'
    },
  });

export default AppStyles;