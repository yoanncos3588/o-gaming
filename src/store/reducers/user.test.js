import userReducer from "./user";
import { initialState } from "./user";
import { it, describe, expect } from 'vitest'
import { updateCredentials } from "./user"

describe('test user reducer', () => {

    it('should return initial state when called without args', () => {
        expect(userReducer(initialState, {})).toBe(initialState)
    });

    it('should fetchRecipes.fulfilled', () => {
        const payload = {"item1": "item2"}
        // en regardant la doc de redux toolkit, on nous indique comment réaliser de stests sur les reducers

        // on crée une action (avec laquelle on appellera notre reducer) à laquelle on passe un payload et un id (paramètre obligatoire mais inutile donc valeur libre)
        const action = updateCredentials.fulfilled(payload, 'requestId')

        // on appelle le reducer à tester en lui passant le state initial et l'action créée
        const state = userReducer(initialState, action)

        // on vérifie que le state retourné par le reducer comporte les valeurs attendues
        expect(state.credentials).toBe(payload)
        

    });



})