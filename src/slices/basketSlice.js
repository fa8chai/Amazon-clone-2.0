import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {state.items = [...state.items, action.payload]},
    
    removeFromBasket: (state, action) => {
      state.items = state.items.map(item =>
        item.id === action.payload.id ? { ...item, quantity:  item.quantity -1 } : item
    );
    },
    remove: (state, action) => {
      const index = state.items.findIndex(basketItem => basketItem.id === action.payload.id)
      let newBasket = [...state.items];
      if (index >= 0) {
        newBasket.splice(index, 1)
      }else{
        console.warn(`Cant remove product (id: ${action.payload.id}) as its not in the basket`)
      }
      state.items = newBasket;
    },
    add: (state, action) => {
      state.items = state.items.map(item =>
        item.id === action.payload.id ? { ...item, quantity:  item.quantity +1 } : item
    );
    },
  },
});

export const { addToBasket, removeFromBasket, remove, add } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;

export default basketSlice.reducer;
