import { OrganizationProvider } from "@/components/organization-context";
import { TeamList } from "@/components/team-list";

export default function Home() {
  return (
    <main>
      <h1>Teams Dashboard</h1>
      <OrganizationProvider>
        <TeamList />
      </OrganizationProvider>
    </main>
  );
}
