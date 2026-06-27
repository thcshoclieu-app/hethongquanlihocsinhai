import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Privacy from './Privacy';

describe('Privacy Page', () => {
  it('renders Privacy Policy', () => {
    render(
      <MemoryRouter>
        <Privacy />
      </MemoryRouter>
    );
    expect(screen.getByText('Chính sách bảo mật & Dữ liệu sinh trắc học')).toBeInTheDocument();
  });
});
