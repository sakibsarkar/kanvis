import SearchTemplatet from "@/components/template/SearchTemplatet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { baseUrl } from "@/redux/api/appSlice";
import { ITemplate } from "@/types/template";
import Image from "next/image";
import Link from "next/link";

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const query = searchParams.q;
  const res = await fetch(baseUrl + `/template/get?searchTerm=${query || ""}`, {
    cache: "no-cache",
  });
  const { data } = (await res.json()) as { data: ITemplate[] };

  return (
    <div className="min-h-screen p`y-[30px]">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Design Templates</h1>
        <SearchTemplatet />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map(({ _id, owner, projectName, thumbnail, createdAt }) => (
            <Link
              key={_id}
              href={`/templates/${_id}`}
              className="hover:shadow-md"
              style={{ transition: "0.3s" }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0 bg-muted">
                  <Image
                    width={300}
                    height={200}
                    alt="thumbnail"
                    src={thumbnail}
                    className="w-full h-48 object-contain"
                  />
                </CardContent>
                <CardFooter className="flex flex-col justify-start items-start gap-[5px] p-4">
                  <h3 className="font-semibold">{projectName}</h3>
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={owner.image} alt={owner.firstName} />
                      <AvatarFallback>
                        {owner.firstName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      {owner.firstName} {owner.lastName}
                    </span>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
