import React from 'react';
import { BackHandler, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Utilities from "./Utilities";
import jwt from "react-native-pure-jwt";

let utilities = new Utilities();

export default class Signup extends React.Component {
    state = {
        email: "",
        password: "",
        userName: ""
    }

    constructor(props) {
        super(props)
        this.handleBackButton = this.handleBackButton.bind(this);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.navigate('Login')
        return true;
    };

    async _signup() {

        fetch('https://reqres.in/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                // If server response message same as Data Matched
                if (responseJson.token) {
                    jwt
                        .sign(
                            {
                                iss: this.state.email,
                                exp: new Date().getTime() + 3600 * 1000, // expiration date, required, in ms, absolute to 1/1/1970
                                additional: "payload"
                            }, // body
                            "my-secret", // secret
                            {
                                alg: "HS256"
                            }
                        )
                        .then((response) => this.JwsToken(response)) // token as the only argument
                        .catch(console.error); // possible errors
                } else {
                    alert('Something missing !!!')
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async JwsToken(response) {
        await AsyncStorage.setItem('jwtToken', response);
        this.props.navigation.navigate('Home')
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>YARAB</Text>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="User Name"
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({ userName: text })} />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Email"
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({ email: text })} />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        secureTextEntry
                        style={styles.inputText}
                        placeholder="Password"
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({ password: text })} />
                </View>
                <TouchableOpacity style={styles.loginBtn}
                    onPress={() => this._signup()}>
                    <Text style={styles.loginText}>SignUp</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#fb5b5a",
        marginBottom: 40
    },
    inputView: {
        width: "80%",
        backgroundColor: "#465881",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "white"
    },
    forgot: {
        color: "white",
        fontSize: 11
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    loginText: {
        color: "white"
    }
});