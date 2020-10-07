// empty for now
export const userSet = user => ({
    type: 'USER_SET',
    payload: user,
});

export const userCreate = user => ({
    type: 'USER_CREATE',
    payload: user,
});

export const userUpdate = user => ({
    type: 'USER_UPDATE',
    payload: user,
});

export const userSetRequest = user => dispatch => {
    return new Promise((resolve, reject) => {
        resolve(dispatch(userSet(user)));
    });
};
