import { StyleSheet } from "react-native";
import design from './../src/views/Composant/couleur';


const AppStyles = StyleSheet.create({

    inputTextView: { 
        fontSize: 16,
        borderColor: 'gray',
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
        width: '100%',
        height: 200,
        opacity: .8,
        borderRadius: 4
      },

    textImage: {
        marginTop:128,
        width: '100%',
        height: 70,
        position: 'absolute',
        alignSelf: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius:4
      },

    produit: {
        paddingHorizontal:10,
        width:'100%',
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
    },
    entreprise: {
        paddingHorizontal:10,
        width:'100%',
        fontSize: 14,
        color: 'white',
    },
    prix: {
        paddingHorizontal:10,
        width:'100%',
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
    },
    touchableStyle: {
      width: '50%',
      alignSelf: 'center',
      marginLeft:0,
      marginRight: 1,
      marginBottom: 2,
    },

    emptyList : {
      alignSelf: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      width: '80%'
    },

    modalStyle: {
      width:30,
      height:30,
      marginLeft:1, 
      marginVertical:7
    },
    searchView : {
      flexDirection:'row',
      marginHorizontal:5,
      marginVertical:20,
    },
    searchIcon : {
      height:20,
      width:20
    },
    filterIcon : {
      width:30,
      height:40,
      marginLeft:1,
      marginVertical:7
    },
    inputContainer: {
        height: 45,
        backgroundColor: 'whitesmoke',
        marginRight:10,
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor:design.Marron,
        borderRadius:10,
        alignItems: 'center',
        width:'87%',
        alignSelf:'center'
    },
    placeholders: {
        marginLeft:18,
        fontSize:16,
    },
    flatList: {
      backgroundColor:design.Blanc,
      marginHorizontal:2,
    },
    loader: {
        alignSelf: 'center',
        justifyContent: 'center',
    }
  });

export default AppStyles;