import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import { ThemeProvider } from '../../context/ThemeContext';
import { I18nProvider } from '../../context/I18nContext';
import SignInPage from '../../pages/SignInPage';
import type { User, Session, AuthError } from '@supabase/supabase-js';

// Mock Supabase - must be defined inline in vi.mock to avoid hoisting issues
vi.mock('../../lib/supabase', () => {
  const mockSupabase = {
    auth: {
      signInWithPassword: vi.fn(() => Promise.resolve({ data: { user: null, session: null }, error: null })),
      signUp: vi.fn(() => Promise.resolve({ data: { user: null, session: null }, error: null })),
      signOut: vi.fn(() => Promise.resolve({ error: null })),
      getSession: vi.fn(() => Promise.resolve({ data: { session: null }, error: null })),
      onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe: vi.fn() } } })),
    },
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn(() => Promise.resolve({ data: null, error: null })),
    })),
  };
  return {
    supabase: mockSupabase,
  };
});

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <I18nProvider>
      <ThemeProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ThemeProvider>
    </I18nProvider>
  </BrowserRouter>
);

describe('SignInPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders sign in form correctly', () => {
    render(
      <TestWrapper>
        <SignInPage />
      </TestWrapper>
    );

    expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    render(
      <TestWrapper>
        <SignInPage />
      </TestWrapper>
    );

    const signInButton = screen.getByRole('button', { name: 'Sign in' });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(screen.getByText('Please enter your email')).toBeInTheDocument();
      expect(screen.getByText('Please enter your password')).toBeInTheDocument();
    });
  });

  it('handles successful sign in', async () => {
    const { supabase } = await import('../../lib/supabase');
    const mockUser = { id: '123' } as unknown as User;
    const mockSession = {
      access_token: 'mock-access-token',
      refresh_token: 'mock-refresh-token',
      expires_in: 3600,
      expires_at: Date.now() / 1000 + 3600,
      token_type: 'bearer' as const,
      user: mockUser,
    } as unknown as Session;
    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue({ 
      data: { user: mockUser, session: mockSession }, 
      error: null 
    });

    render(
      <TestWrapper>
        <SignInPage />
      </TestWrapper>
    );

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const signInButton = screen.getByRole('button', { name: 'Sign in' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(signInButton);

    await waitFor(async () => {
      const { supabase } = await import('../../lib/supabase');
      expect(vi.mocked(supabase.auth.signInWithPassword)).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('handles sign in error', async () => {
    const { supabase } = await import('../../lib/supabase');
    const mockError = { message: 'Invalid credentials' } as unknown as AuthError;
    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue({ 
      data: { user: null, session: null }, 
      error: mockError
    });

    render(
      <TestWrapper>
        <SignInPage />
      </TestWrapper>
    );

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const signInButton = screen.getByRole('button', { name: 'Sign in' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  it('switches to sign up mode', () => {
    render(
      <TestWrapper>
        <SignInPage />
      </TestWrapper>
    );

    const switchButton = screen.getByText('Sign up');
    fireEvent.click(switchButton);

    expect(screen.getByText('Create an Account')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up|create account/i })).toBeInTheDocument();
  });
});

