import React, { Component } from 'react';
import {
    Alert,
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    BackHandler
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class addUser extends Component {

    constructor(props) {
        super(props);
        this.handleBackButton = this.handleBackButton.bind(this);
        this.state = {
            firstName: '',
            lastName: '',
            email: ''
        }
    }

    //method used to create user 
    _createUser() {
        if(this.state.firstName != '' && this.state.lastName != '' && this.state.email != ''  ){
            this.sendUserData()
        }
        else{
            alert('All fields are mandatory')
        }
    }

    sendUserData(){
        fetch('https://reqres.in/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.firstName + this.state.lastName,
                email: this.state.email
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //if the response is success
                if (responseJson.name) {
                    Alert.alert(
                        '', 'Successfully added',
                        [
                            { text: 'OK', onPress: () => this.props.navigation.navigate('Home') },
                        ],
                        {
                            cancelable: true
                        }
                    );
                } else {
                    alert('Something missing !!!')
                }

            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.navigate('Home')
        return true;
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Add new user</Text>
                <View style={{ marginBottom: 20 }} >
                    <Image source={{ uri: 'https://image.winudf.com/v2/image1/dWsuY28ubWFya29ybWVzaGVyLmFuZHJvaWRfZmFiLmFwcF9pY29uXzE1NTEwMTQ1MzhfMDAw/icon.png?w=170&fakeurl=1' }}
                        style={styles.profileImage}
                    />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="First Name"
                        placeholderTextColor="#686F7A"
                        onChangeText={text => this.setState({ firstName: text })}
                         />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Last Name"
                        placeholderTextColor="#686F7A"
                        onChangeText={text => this.setState({ lastName: text })}
                         />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Email"
                        placeholderTextColor="#686F7A"
                        onChangeText={text => this.setState({ email: text })}
                         />
                </View>
                <TouchableOpacity style={styles.updateBtn}
                    onPress={() => this._createUser()}>
                    <Text style={styles.updateText}>Create</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0C1922", 
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        color: "white",
        fontFamily: "TT Norms Pro Regular",
        textAlign: 'justify',
        fontWeight: "bold",
        letterSpacing: 0.03
    },
    updateText: {
        color: "white"
    },
    profileImage:{ 
        width: wp(40), 
        height: hp(20), 
        resizeMode: 'cover', 
        borderRadius: 100 },
    heading: {
        fontWeight: "bold",
        fontSize: 20,
        color: "white",
        marginBottom: 20
    },
    inputView: {
        width: "80%",
        backgroundColor: "#2E3A43",
        borderRadius: 5,
        height: 30,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "white"
    },
    updateBtn: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
})

