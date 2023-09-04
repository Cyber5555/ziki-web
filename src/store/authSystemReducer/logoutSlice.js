import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Http } from '../../http'

export const logoutRequest = createAsyncThunk('logout', async ({ rejectWithValue }) => {
  try {
    let response = Http.get(`${process.env.REACT_APP_API_URL}api/logout`, {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      Accept: 'application/json'
    })
    return response
  } catch (error) {
    return rejectWithValue(error.response)
  }
})

const logoutSlice = createSlice({
  name: 'logout',
  initialState: {
    isLoading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutRequest.pending, (state) => {
        state.isLoading = true
      })

      .addCase(logoutRequest.fulfilled, (state, action) => {
        if (action.payload.success) {
          localStorage.clear()
        }
        state.isLoading = false
      })

      .addCase(logoutRequest.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export default logoutSlice.reducer
