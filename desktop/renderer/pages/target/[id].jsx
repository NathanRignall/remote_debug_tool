import { useRouter } from "next/router";
import Link from "next/link";

import Button from "../../components/Button";
import Header from "../../components/Header";

export default function Target() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <div className="h-screen flex flex-col">
        <Header>
          <div className="grow bg-gray-700 py-3">{id} </div>

          <div>
            <Button className="bg-gray-300 text-gray-900">GDB</Button>{" "}
            <Button className="bg-gray-300 text-gray-900">Status</Button>{" "}
            <Link href="/home">
              <Button className="bg-blue-600 text-white">Back</Button>
            </Link>
          </div>
        </Header>

        <div class="grow flex flex-col mx-2 my-3">
          <div className="grow w-full p-2 min-h-[15rem]">
            <div className="h-full bg-gray-800 text-gray-200 p-5 rounded-lg">
              SOME DATA HERE
            </div>
          </div>

          <div className="grow w-full p-2 min-h-[15rem]">
            <div className="h-full bg-gray-800 text-gray-200 p-5 rounded-lg">
              SOME DATA HERE
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
