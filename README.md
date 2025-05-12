# 🧠 Project Overview

Three Layers of Data Architecture.

Back to the three layers. The architecture is simple:

```plaintext
1- Server Components - Initial data fetching
2- React Query - Client-side caching and updates
3- Optimistic Updates - Instant UI feedback
```

---

## 📁 Project Structure

### File Structure

```plaintext
app/
├── page.tsx # Layer 1: Server Component entry
├── api/
│ └── teams/
│ ├── route.ts # Get all teams
│ └── [teamId]/
│ └── route.ts # GET specific team
├── team-list.tsx # Client component consuming Layers 2 & 3
├── components/ # Fix: Add this folder
│ └── team-card.tsx
└── ui/
├── error-state.tsx # Layer 2: Error handling states
└── loading-state.tsx # Layer 2: Loading states

hooks/
├── teams/
│ ├── use-team-data.ts # Layer 2: React Query hooks
│ └── use-team-mutations.ts # Layer 3: Mutations with optimism

data-layer/ # Layer 1: Server-side database queries
├── teams/
│ ├── getTeamsWithUsers.ts
│ ├── getTeamById.ts
│ ├── createTeam.ts
│ ├── deleteTeamById.ts
│ ├── createTeam.ts
│ ├── updateTeamById.ts

context/
└── OrganizationContext.tsx # Layer 2: Centralized data management
```

## Data Flow

```plaintext
User Request↓
Layer 1: Server Component
• getAllTeams() → Database
• Returns HTML with data
↓
Layer 2: React Query
• Hydrates with server data
• Manages client-side cache
• Handles refetching
↓
Layer 3: User Actions
• Optimistic updates
• Real mutations
• Cache invalidation
```
