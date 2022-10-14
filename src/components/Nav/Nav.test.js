/**
 * @jest-environment jsdom
 */

import { screen, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Nav from '.';

describe('NAV', () => {
    test('it renders the site name', () => {
        render(<Nav />, {wrapper: MemoryRouter});
        const siteNameTag = screen.getByTestId('siteName');
        const siteName = siteNameTag.textContent
        expect(siteName).toBe('Quizzy Rascal');

    })

    test('it has a logo', () => {
        const siteAvatarTag = screen.queryByRole('Logo')
        expect(siteAvatarTag).toBeInTheDocument
    })
})
