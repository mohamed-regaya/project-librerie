import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, thunkAPI) => {
    try {
      let result = await axios.post(
        "http://localhost:8000/auth/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, thunkAPI) => {
    try {
      let result = await axios.post("http://localhost:8000/auth/login", data);
      return result.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (data, thunkAPI) => {
    try {
      let result = await axios.put(
        "http://localhost:8000/auth/update_profile",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

let initialState = {
  user: null,
  loading: false,
  error: null,
  msg: null,
  token: null,
};

let authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      return (state = initialState);
    },
    resetAuthMessages: (state) => {
      state.error = null;
      state.msg = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.msg = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        if (action.payload.message) {
          state.msg = action.payload.message;
        } else {
          state.error = action.payload.error;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload.error;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.msg = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.error) {
          state.error = action.payload.error;
        } else {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.msg = action.payload.msg;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload.error;
      })

      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.msg = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.error) {
          state.error = action.payload.error;
        } else {
          state.user = action.payload.user;

          state.msg = action.payload.msg;
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload.error;
      });
  },
});

export const { logout, resetAuthMessages } = authSlice.actions;

export default authSlice.reducer;
