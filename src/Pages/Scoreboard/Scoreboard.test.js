/**
 * @jest-environment jsdom
 */

import { screen, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Scoreboard from '.';

import axios from 'axios';
jest.mock('axios')
// axios.get.mockResolvedValue({})

describe('Scoreboard', () => {
    beforeEach(() => {
        render(<Scoreboard />, {wrapper: MemoryRouter})
    })

    beforeEach(() => {
        axios.get.mockResolvedValue({data: [{"_id":"63460a67a78483e47a74ddb3","name":"Karl Dudley","highScore":4,"category":"15","createdAt":"2022-10-12T00:29:27.022Z","updatedAt":"2022-10-12T00:29:27.022Z","__v":0}]})
    })

    it('it has a name header on the row', () => {
        const name = screen.getByDisplayValue('Name')
        expect(name).toBeInTheDocument
    })

    afterEach(() => {
        axios.get.mockClear();
      });

    // it('it has a dropdown to select category', () => {
    //     const dropdown = screen.getByLabelText('Category: ')
    //     expect(dropdown).toBeInTheDocument
    // })
})
