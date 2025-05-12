import { OrganizationProvider } from "@/components/organization-context";

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
