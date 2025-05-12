app/
├── page.tsx # Layer 1: Server Component entry
├── api/
│ └── teams/
│ └── route.ts # Get all teams
│ └── [teamId]/
│ └── route.ts # GET specific team
├── TeamList.tsx # Client component consuming Layers 2 & 3
├── components/ # Fix: Add this folder
│ └── TeamCard.tsx
└── ui/
├── error-state.tsx # Layer 2: Error handling states
└── loading-state.tsx # Layer 2: Loading states

hooks/
├── teams/
│ ├── useTeamsData.ts # Layer 2: React Query hooks
│ └── useTeamMutations.ts # Layer 3: Mutations with optimism

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

User Request
↓
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
