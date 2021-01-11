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

export default class editUser extends Component {

    constructor(props) {
        super(props);
        this.handleBackButton = this.handleBackButton.bind(this);
        this.userId = this.props.navigation.state.params.userId;
        this.state = {
            userDatas: [],
            firstName: '',
            lastName: '',
            email: ''
        }
    }

    componentDidMount() {
        this._getUserDatas();
    }

    //to get datas of corresponding user
    async _getUserDatas() {
        fetch('https://reqres.in/api/users/' + this.userId, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.data);
                //if the response is success
                if (responseJson.data) {
                    this.setState({ userDatas: responseJson.data })
                    this.setState({ firstName: responseJson.data.first_name })
                    this.setState({ lastName: responseJson.data.last_name })
                    this.setState({ email: responseJson.data.email })
                } else {
                    alert('Something missing !!!')
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    //method used to update user datas
    updateUser(userId) {
        fetch('https://reqres.in/api/users/' + userId, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.firstName + this.state.lastName,
                email: this.state.email
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //if the response is success
                if (responseJson.email) {
                    Alert.alert(
                        '', 'Successfully updated',
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
                <Text style={styles.heading}>Edit user details</Text>
                <View style={{ marginBottom: 20 }} >
                    <Image source={{ uri: this.state.userDatas.avatar }}
                        style={styles.profileImage}
                    />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="First Name"
                        placeholderTextColor="#686F7A"
                        onChangeText={text => this.setState({ firstName: text })}
                        value={this.state.firstName} />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Last Name"
                        placeholderTextColor="#686F7A"
                        onChangeText={text => this.setState({ lastName: text })}
                        value={this.state.lastName} />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Email"
                        placeholderTextColor="#686F7A"
                        onChangeText={text => this.setState({ email: text })}
                        value={this.state.email} />
                </View>
                <TouchableOpacity style={styles.updateBtn}
                    onPress={() => this.updateUser(this.state.userDatas.id)}>
                    <Text style={styles.updateText}>Update</Text>
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

