/**
 * @jest-environment jsdom
 */

import {render, screen, within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App.js'
// import axios from 'axios';
// jest.mock('axios')

// axios.get.mockResolvedValue({ data: [ { latlng: [123, 456] }]})
global.React = React;

describe('App', () => {
    beforeEach(() => {render(<App />)
    })

    it('it has instructions', () => {
        
        const header = screen.queryByRole('Instructions')
        expect(header).toHaveTextContent('Instructions')
    })

    // test('renders story headlines', () => {
    //     const headlines = screen.getByRole('list');
    //     expect(headlines.textContent).toContain('It was a dark and stormy night');
    // })

    // test("greets a user as 'friend' if no username given", () => {
    //     const greeting = screen.getByRole('heading', { name: 'greeting' });
    //     expect(greeting.textContent).toBe("Hi there, friend!");
    //   });

    // test("Doesn't change text on userinput", async () => {
    //     const nameInput = screen.getByLabelText("Username")
    //     await userEvent.type(nameInput, 'John')
    //     const greeting = screen.getByRole('heading', {name: 'greeting'});
    //     expect(greeting.textContent).toBe('Hi there, friend!');
    // })

    // test("changes greeting when user enters input", async () => {
    //     const nameInput = screen.getByLabelText("Username")
    //     await userEvent.type(nameInput, 'John{enter}')
    //     const button = screen.getByRole('button', {name: "Update!"})
    //     const greeting = screen.getByRole('heading', {name: 'greeting'});
    //     // const form = screen.getByRole('form')
    //     // await userEvent.submit(form)
    //     expect(greeting.textContent).toBe('Hi there, John!');
    // })


})
