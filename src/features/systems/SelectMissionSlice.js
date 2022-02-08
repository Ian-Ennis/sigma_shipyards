import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import proxima_centauri from ".//Images/proxima_centauri.jpeg";
import tau_ceti from ".//Images/tau_ceti.jpeg";
import upsilon_andromedae from ".//Images/upsilon_andromedae.jpeg";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const updateSystems;

export const missonSelectSlice = createSlice({
    name: 'starSystem',
    initialState: [],
    reducers: {
        chooseSystem: (state) => {}
        }
    }
)

