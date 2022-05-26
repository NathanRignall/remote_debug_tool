import { useRouter } from "next/router";
import Link from "next/link";

export default function Target() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <div>{id}</div>

      <Link href="/home">Back</Link>
    </>
  );
}
