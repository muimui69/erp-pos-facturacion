import { Params } from "@/lib/constants";
import { headers } from "next/headers"

export default function SubdomainPageTest(req: Params) {

    const headerList = headers();
    const { subdomain } = req.params;

    const hostname = headerList.get("host")

    return (
        <div>hello from subdomain {hostname} {subdomain}</div>
    )
}
