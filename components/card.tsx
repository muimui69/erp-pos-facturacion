"use client"

import { Icons } from "./icons";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface CardProps {
    title: string;
    value: string;
    description: string;
    nameIcon: keyof typeof Icons;
}

export const CardCustom = ({ title, value, description, nameIcon }: CardProps) => {
    const IconComponent = Icons[nameIcon];

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
                {IconComponent && <IconComponent className="h-5 w-5 text-muted-foreground" />}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">
                    {description}
                </p>
            </CardContent>
        </Card>
    );
};

