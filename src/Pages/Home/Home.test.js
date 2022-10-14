/**
 * @jest-environment jsdom
 */
import React, {useState} from "react"
import { screen, render, fireEvent, getByTestId, waitFor, getByTitle, getByText, getByPlaceholderText, getByRole } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Select from '@mui/material/Select';
import { getButtonUtilityClass, MenuItem } from "@mui/material";
import Home from '.';

describe('Home Page', () => {
    beforeEach(() =>{
        render(<Home />, {wrapper: MemoryRouter});
    })

    it('it has instructions', () => {
        
        const header = screen.getByTestId('Instructions')
        expect(header).toHaveTextContent('Instructions')
    })

    it('it has a Join a Game div', () => {
        const joinDiv = screen.getByRole('Join')
        expect (joinDiv).toHaveTextContent('Join a Game')
    })

    it('it has a Create a Game div', () => {
        const createDiv = screen.getByRole('Create')
        expect (createDiv).toHaveTextContent('Create new Game')
    })

    it('it renders forms', () => {
        const form = screen.getByRole('form')
        expect(form).toBeInTheDocument
    })


    it('it has input label for name', () => {
        const name = screen.getAllByLabelText ('name')
        expect(name).toBeInTheDocument
    })

    it('it has input label for room', () => {
        const room = screen.getAllByLabelText ('room')
        expect(room).toBeInTheDocument
    })

    describe('Create new game', () => {

        it('it has dropdown for category', () => {
            const dropdownCategory = screen.getByRole ('dropdownCategory')
            expect(dropdownCategory).toBeInTheDocument
        })
        it('it has dropdown for category', () => {
            const dropdownDifficulty = screen.getByRole ('dropdownDifficulty')
            expect(dropdownDifficulty).toBeInTheDocument
        })
        it('it has dropdown for question type', () => {
            const dropdownQuestionType = screen.getByRole ('dropdownType')
            expect(dropdownQuestionType).toBeInTheDocument
        })

        it('it store the selected category', async () => {
            // const [category, setCategory] = React.useState('');
            // const handleChangeCategory = (e) => {
            //     setCategory(e.target.value);
            //   }

            // const dropdownCategory = screen.getByRole('dropdownCategory')
            // const display = dropdownCategory.at(0).instance().selected
            // const options = userEvent.selectOptions(dropdownCategory)
            // console.log(options)
            
            // fireEvent.mouseDown(dropdownCategory)
            // const category = within(getButtonUtilityClass('category'));
            // const dropdownCategory = screen.getByRole('dropdownCategory')
            // const listItem = dropdownCategory.within(getByPlaceholderText('Entertainment: Books/'))
            // const listItem = screen.getByRole('button')
            
            // fireEvent.click(listItem.getByText('Entertainment: Books/'))
            // await userEvent.type(dropdownCategory)
            // expect(dropdownCategory).toHaveValue('9')
            // expect(listItem).toHaveProperty('MenuItem')
            // console.log(listItem)
            // expect(dropdownCategory).toHaveProperty('Entertainment: Books')

            // const dropdownCategory = screen.getByRole('dropdownCategory')
            userEvent.click((screen.getByRole('dropdownCategory'), "button"));
            // userEvent.click(dropdownCategory);
            await waitFor(() => userEvent.click(screen.getByText(/Entertainment: Books/i)));
            expect(dropdownCategory).toHaveDisplayValue(/Entertainment: Books/i)

        })



    })

    it('submits', () => {
        const handleJoinGame = jest.fn()
        render(<Home onSubmit={handleJoinGame} />);
        fireEvent.submit(getByTestId("joinForm"))
        expect(handleJoinGame).toHaveBeenCalled()
        // const nameInput = screen.getByRole('inputNameToJoin')
        // await userEvent.type(nameInput, "Jonathan{enter}")
        // expect(nameInput).toHaveBeenCalledWith("Mary")
    })

    it('brings user to lobby', ()=> {
        const handleCreateGame = jest.fn()
        render(<Home onSubmit={handleCreateGame} />)

        fireEvent.click(getByText('Create Game'))
        expect(handleJoinGame).toBeCalled()
    })
})
