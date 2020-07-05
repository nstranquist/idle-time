import { createSelector } from 'reselect'

export const selectIsSignedIn = state => state.auth.signedIn;

export const selectAuthToken = state => state.auth.token;

export const selectAuthLoading = state => state.auth.loading;

export const selectAuthErrors = state => state.auth.errors;

export const selectName = state => state.auth.userData.name;

export const selectEmail = state => state.auth.userData.email;

export const selectUserId = state => state.auth.userData._id;

export const selectUserData = createSelector(
  selectName,
  selectEmail,
  selectUserId,
  (name, email, id) => ({
    id, name, email
  })
)