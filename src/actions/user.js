
import React, { useCallback, useState } from 'react';
//import Firebase, { db } from '../config/Firebase.js'
// define types
class User extends React.Component {
    constructor(props) {
      super(props);
  }

  componentDidMount() {  }
}
export const UPDATE_EMAIL = 'UPDATE_EMAIL'
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
export const LOGIN = 'LOGIN'
export const SIGNUP = 'SIGNUP'

// actions

// update the email as the user enter & change
export const updateEmail = email => {
	return {
		type: UPDATE_EMAIL,
		payload: email
	}
}


// update the password as the user enter & change
export const updatePassword = password => {
	return {
		type: UPDATE_PASSWORD,
		payload: password
	}
}



// function for login 
export const login = () => {
	return async (dispatch, getState) => {
	}
}


export const getUser = uid => {
	return async (dispatch, getState) => {
	}
}


// function to signup 
export const signup = () => {
	
}