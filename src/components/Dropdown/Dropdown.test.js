/**
 * @jest-environment jsdom
 */
import { screen, render, fireEvent, getByTestId } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Dropdown from '.';

describe('Drop Down', () => {
    beforeEach(() => {
        render(<Dropdown />, {wrapper: MemoryRouter})
    })

    it('it has an option to select', () => {
        const option = screen.getByTestId('option')
        expect(option).toBeInTheDocument
    })
})
