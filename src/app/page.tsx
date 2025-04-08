import { redirect } from "next/navigation"  // or the relevant path to your CSS file


export default function Home(): JSX.Element {
  return redirect("/login") as any;
}
