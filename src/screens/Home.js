import React, { Component } from 'react';
import {
    Alert,
    FlatList,
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    BackHandler,
    AsyncStorage
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class Home extends Component {

    constructor() {
        super();
        this.handleBackButton = this.handleBackButton.bind(this);
        this.state = {
            userDatas: []
        }
    }

    componentDidMount() {
        this._getUserDatas();
    }

    //to get users data
    async _getUserDatas() {
        fetch('https://reqres.in/api/users', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.data);
                //if the response is success
                if (responseJson.data) {
                    this.setState({ userDatas: responseJson.data })
                    console.log("log datas", this.state.userDatas);
                } else {
                    alert('Something missing !!!')
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    //to delete the correspoding user
    _deleteItem(userId) {
        console.log(userId)
        Alert.alert(
            '', 'Do you want to delete this User ?',
            [
                { text: 'No', onPress: () => console.log('OK button clicked') },
                { text: 'Yes', onPress: () => this.deleteUser(userId), style: 'destructive', },
            ],
            {
                cancelable: true
            }
        );
    }

    deleteUser(userId) {
        fetch('https://reqres.in/api/users/' + userId, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => {
                const refreshedArray = this.state.userDatas.filter(item => item.id !== userId)
                this.setState({ userDatas: refreshedArray })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    //to edit the user
    _editUser(userId) {
        this.props.navigation.navigate('editUser', { userId: userId })
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        Alert.alert(
            '', 'Are you sure, you want to Logout ?',
            [
                { text: 'No', onPress: () => console.log('OK button clicked') },
                { text: 'Yes', onPress: () =>   this._logOut(), style: 'destructive', },
            ],
            {
                cancelable: true
            }
        );
        return true;
    };

    async _logOut(){
        await AsyncStorage.removeItem('jwtToken');
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#0C1922" }}>
                <TouchableOpacity style={styles.addBtn}
                    onPress={() => this.props.navigation.navigate('addUser')}>
                    <Text style={styles.loginText}>Add User</Text>
                </TouchableOpacity>
                <FlatList
                    data={this.state.userDatas}
                    renderItem={({ item }) => (
                        <View
                            style={styles.container}>
                            <View style={styles.profileImage}>
                                <Image source={{ uri: item.avatar }}
                                    style={styles.imageStyle}
                                />
                            </View>
                            <View style={styles.detailsView}>
                                <Text style={styles.loginText}>{item.first_name} {item.last_name}</Text>
                                <Text style={styles.loginText}>{item.email}</Text>
                            </View>
                            <View style={styles.buttonsView}>
                                <TouchableOpacity style={styles.editBtn}
                                    onPress={() => this._editUser(item.id)}>
                                    <Text style={styles.loginText}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.deleteBtn}
                                    onPress={() => this._deleteItem(item.id)}>
                                    <Text style={styles.loginText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}>
                </FlatList>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2E3A43',
        margin: 5,
        height: hp(15),
        flexDirection: 'row'
    },
    profileImage: {
        flex: .5,
        flexDirection: 'row',
        marginRight: wp(2.133),
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#0C1922'
    },
    loginText: {
        color: "white"
    },
    deleteBtn: {
        backgroundColor: "red",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 2.5
    },
    editBtn: {
        backgroundColor: "#004C76",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 2.5
    },
    imageStyle: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
        borderRadius: 4
    },
    detailsView: {
        flex: 1,
        flexDirection: 'column',
        marginRight: wp(2.133),
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#0C1922',
        justifyContent: 'center',
        paddingLeft: 10
    },
    buttonsView: {
        flex: .3,
        flexDirection: 'column',
        marginRight: wp(2.133),
        borderRadius: 4,
        alignContent: 'center',
        justifyContent: 'center'
    },
    addBtn:{
        width: "95%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        marginBottom: 10,
        marginLeft:wp(2.5)
    }
})

