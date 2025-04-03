<div align="center">
  <img src="assets/images/logo.svg" alt="GiftMate Logo" width="400" />

  [![Netlify Status](https://api.netlify.com/api/v1/badges/0a2e53da-723e-4bb4-ae3b-6113fc5e96ea/deploy-status)](https://app.netlify.com/sites/giftmate-dev/deploys)
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
  [![Version](https://img.shields.io/badge/version-1.0.0-green.svg)]()
</div>

## Overview

GiftMate - A smart companion app that helps you track important dates, manage gift ideas, and strengthen relationships by never missing special occasions. Perfect for remembering birthdays, anniversaries, and creating thoughtful gift lists for your loved ones.


## Tech Stack

- **Frontend**: React Native, Expo
- **State Management**: React Context API
- **Styling**: NativeWind (Tailwind CSS)
- **Navigation**: React Navigation
- **Backend**: Supabase (Auth, Database, Storage)
- **Tooling**: TypeScript, Prettier, ESLint

## Installation

```bash
git clone https://github.com/your-org/giftmate-app.git
cd giftmate-app
npm install
```

## Development Setup

1. Create `.env` file from template:

```bash
cp .env.example .env
```

2. Configure Supabase credentials:

```ini
SUPABASE_URL=your-project-url
SUPABASE_KEY=your-anon-key
```

3. Start development server:

```bash
npm run dev
```

## Authentication Guide

### Email/Password Flow

```tsx
// app/auth/SignUpScreen.tsx
export const SignUpForm = () => {
  const { signUp } = useAuth();

  const handleSubmit = async (email: string, password: string) => {
    try {
      await signUp(email, password);
      router.replace('/dashboard');
    } catch (error) {
      showErrorAlert(error.message);
    }
  };

  return <AuthForm type="signup" onSubmit={handleSubmit} />;
};
```

### OAuth Providers

```tsx
// hooks/useAuth.ts
export const useAuth = () => {
  const signInWithOAuth = async (provider: 'google' | 'apple') => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) throw new AuthenticationError(error.message);
  };

  return { signInWithOAuth };
};
```

## Component Documentation

### GiftCard Component

```tsx
// components/GiftCard.tsx
interface GiftCardProps {
  gift: Gift;
  onPress?: () => void;
}

export const GiftCard = ({ gift, onPress }: GiftCardProps) => (
  <Pressable onPress={onPress}>
    <Image source={{ uri: gift.imageUrl }} />
    <Text>{gift.name}</Text>
    <Text>{gift.description}</Text>
  </Pressable>
);
```

**Props**:

- `gift`: Gift object containing details
- `onPress`: Callback when card is pressed

## Supabase Integration

### Real-time Subscriptions

```tsx
// hooks/useGifts.ts
export const useGifts = () => {
  useEffect(() => {
    const channel = supabase
      .channel('gifts')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'gifts',
        },
        handleGiftUpdate,
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);
};
```

## Documentation Structure

📚 **Core Guides**:

- [Getting Started](/docs/getting-started.md) - Environment setup & installation
- [Component Docs](/docs/components.md) - UI component specifications
- [Authentication Guide](/docs/authentication.md) - Supabase integration
- [Best Practices](/docs/best-practices.md) - Coding standards & security

## Documentation Roadmap

- [ ] Add performance benchmarking guide
- [ ] Create testing strategy document
- [ ] Develop deployment playbook

## Contributing

Help us improve documentation by:

1. Following our [style guide](CONTRIBUTING.md#documentation)
2. Using the template:

```markdown
## Feature Name

### Purpose

<!-- Describe functionality -->

### Implementation
```

3. Submitting PRs to the `docs` directory

### Code Standards

1. TypeScript strict mode
2. Functional components with hooks
3. Atomic design pattern
4. 80% test coverage

### PR Checklist

- [ ] Linting passes
- [ ] Tests updated
- [ ] Documentation added
- [ ] Supabase migrations (if needed)

## Troubleshooting

| Error                       | Solution                  |
| --------------------------- | ------------------------- |
| `Network Request Failed`    | Check Supabase URL/Key    |
| `Invalid OAuth Credentials` | Verify deep linking setup |
| `Expo SDK Mismatch`         | Run `expo doctor --fix`   |

## Performance Tips

1. Memoize expensive computations
2. Virtualize long lists
3. Optimize image sizes
4. Batch Supabase requests
5. Use error boundaries

## Security Practices

- Row Level Security (RLS) enabled
- JWT refresh every 15 minutes
- SecureStore for sensitive data
- Input sanitization for DB queries

---

_Documentation version: 1.2.0 | Last updated: ${new Date().toISOString().split('T')[0]}_
