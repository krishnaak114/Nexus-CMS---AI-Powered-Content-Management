import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home Page', () => {
  it('renders the welcome message', () => {
    render(<Home />)
    expect(screen.getByText(/Welcome to/i)).toBeInTheDocument()
    expect(screen.getByText(/Nexus CMS/i)).toBeInTheDocument()
  })

  it('displays the main features', () => {
    render(<Home />)
    expect(screen.getAllByText(/AI-Powered/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/Lightning Fast/i)).toBeInTheDocument()
    expect(screen.getByText(/Full-Featured/i)).toBeInTheDocument()
  })

  it('has Get Started button', () => {
    render(<Home />)
    const button = screen.getByRole('link', { name: /Get Started/i })
    expect(button).toBeInTheDocument()
  })

  it('has Learn More button', () => {
    render(<Home />)
    const button = screen.getByRole('link', { name: /Learn More/i })
    expect(button).toBeInTheDocument()
  })
})
