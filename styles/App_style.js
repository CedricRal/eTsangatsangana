import { StyleSheet } from "react-native";


const AppStyles = StyleSheet.create({

    inputTextView: { 
        backgroundColor: '#fff',
        width: 410
      },

    headView: {
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 10,
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
      marginTop: 60,
      fontWeight: '600'
    },
    listItem: {
      marginTop: 10,
      marginBottom:-30,
      padding: 20,
      alignItems: 'center',
      backgroundColor: '#fff',
      width: '50%'
    },
    coverImage: {
        width: 180,
        height: 275,
        borderRadius: 8,
        opacity: 0.6,
      },
    textImage: {
        paddingTop: 100,
        position: 'absolute',
        justifyContent: 'center',
      },
    listItemText: {
        fontWeight: 'bold',
        fontSize: 20
    }
  });

export default AppStyles;