import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Terms from './Terms';

describe('Terms Page', () => {
  it('renders Terms of Service', () => {
    render(
      <MemoryRouter>
        <Terms />
      </MemoryRouter>
    );
    expect(screen.getByText('Điều khoản sử dụng')).toBeInTheDocument();
  });
});
