"use client";

import { Key } from "react";

const customTooltip = (props: any) => {
  const { payload, active } = props;
  return (
    <div className="w-56 rounded-tremor-default border border-tremor-border bg-tremor-background p-2 text-tremor-default shadow-tremor-dropdown">
      {payload.map((category: any, idx: Key | null | undefined) => (
        <div key={idx} className="flex flex-1 space-x-2.5">
          <div className={`flex w-1 flex-col bg-blue-300 rounded`} />
          <div className="space-y-1">
            <p className="text-tremor-content">{category.dataKey}</p>
            <p className="font-medium text-tremor-content-emphasis">
              {category.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default customTooltip;
