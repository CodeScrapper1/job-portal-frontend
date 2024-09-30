import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { filterData } from "@/lib/data";
import Link from "next/link";
import { Label } from "../ui/label";

const FilterJobs = () => {
  return (
    <div>
      {filterData?.map((data, index) => (
        <Accordion key={index} type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>{data?.filterType}</AccordionTrigger>
            <AccordionContent>
              {data?.array?.map((item, ind) => (
                <Link
                  key={ind}
                  href={`/findjobs?${data?.filterType}`}
                  className="flex items-center my-5 cursor-pointer"
                >
                  <Label htmlFor={ind} className="cursor-pointer">
                    {item}
                  </Label>
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default FilterJobs;
