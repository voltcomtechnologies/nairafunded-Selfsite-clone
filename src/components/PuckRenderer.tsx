"use client";

import { Render } from "@puckeditor/core";
import { config } from "@/puck.config";

export default function PuckRenderer({ data }: { data: any }) {
    return <Render config={config} data={data} />;
}
