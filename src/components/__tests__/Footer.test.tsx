import { render, screen } from '@testing-library/react'
import Footer from '@/components/Footer'

describe('Footer Component', () => {
  it('renders developer name', () => {
    render(<Footer />)
    expect(screen.getByText(/Agrawal Krishna Manoj/i)).toBeInTheDocument()
  })

  it('displays GitHub link', () => {
    render(<Footer />)
    const githubLink = screen.getByRole('link', { name: /GitHub/i })
    expect(githubLink).toHaveAttribute('href', 'https://github.com/krishnaak114')
  })

  it('displays LinkedIn link', () => {
    render(<Footer />)
    const linkedInLink = screen.getByRole('link', { name: /LinkedIn/i })
    expect(linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/in/agrawal-krishna-aa11a61ba/')
  })

  it('shows assignment attribution', () => {
    render(<Footer />)
    expect(screen.getByText(/House of EdTech/i)).toBeInTheDocument()
  })
})
