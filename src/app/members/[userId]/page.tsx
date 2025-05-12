import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { getUserById } from "@/data-layer/users";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ userId: string }>;
}

const getUser = cache(async (userId: string) => {
  const user = await getUserById(Number(userId));

  if (!user) notFound();

  return user;
});

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { userId } = await params;

  const user = await getUser(userId);

  return {
    title: `@${user.name} | Members`,
  };
}

export default async function Page({ params }: PageProps) {
  const { userId } = await params;
  const user = await getUser(userId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <p>{user.name}</p>
          <Button
            variant="link"
            asChild
          >
            <Link href={`/`}>
              <ArrowLeft className="text-red-600" />
            </Link>
          </Button>
        </CardTitle>
        <CardDescription>
          <p>Email: {user.email}</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Team: {user.team?.name}</p>
        <p>Description: {user.team?.description}</p>
      </CardContent>
    </Card>
  );
}
