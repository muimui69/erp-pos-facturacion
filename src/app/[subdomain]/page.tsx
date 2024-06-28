import React from "react"

export default function Page({ params }: { params: { subdomain: string } }) {
    return (
        <div>My Post: {params.subdomain}</div>
    )
}