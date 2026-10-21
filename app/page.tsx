<<<<<<< HEAD
"use client";

import Dashboard from "../features/Dashboard/Dashboard";

export default function HomePage() {
  return <Dashboard />;
=======
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login");
>>>>>>> master
}
