import { useRouter } from "next/router";
import Link from "next/link";

import PowerButton from "../../components/PowerButton";

export default function Target() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <div className="h-screen flex flex-col">
        <div className="w-full flex bg-gray-700 py-3 px-6">
          <div className="grow bg-gray-700 py-2">{id} </div>

          <div className="">
            <Link href="/home">
              <div className="bg-blue-600 inline-block px-8 py-3 rounded-lg cursor-pointer">
                Back
              </div>
            </Link>
          </div>
        </div>

        {/* <div className="flex grow"> */}
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

        {/* <div class="flex-none w-14 bg-gray-700">03</div> */}
      </div>
      {/* </div> */}
    </>
  );
}
