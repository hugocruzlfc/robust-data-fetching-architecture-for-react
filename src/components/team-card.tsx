"use client";

import { useTeamMutations } from "@/hooks/use-team-mutations";
import { TeamsData } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { Button } from "./ui/button";

// TeamList.tsx - Using Layer 3 mutations

interface TeamCardProps {
  team: TeamsData;
}

export function TeamCard({ team }: TeamCardProps) {
  const { deleteTeam, isDeleting } = useTeamMutations();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{team.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Members: {team.members.length}</p>
        <div className="space-x-2">
          {team.members.map((member) => (
            <Link
              key={member.id}
              href={`/members/${member.id}`}
            >
              <Badge>{member.name}</Badge>
            </Link>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="destructive"
          onClick={() => deleteTeam(Number(team.id))}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete Team"}
        </Button>
      </CardFooter>
    </Card>
  );
}
