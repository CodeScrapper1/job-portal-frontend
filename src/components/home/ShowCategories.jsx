"use client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { categories } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { Button } from "../ui/button";

const ShowCategories = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <Carousel
      plugins={[plugin.current]}
      opts={{ align: "start" }}
      className="w-full max-w-xl mx-auto my-20"
    >
      <CarouselContent>
        {categories?.map((item, index) => (
          <CarouselItem key={index} className="md:basis-1/3">
            <Link href={`/findjobs?${item}`} className="p-1">
              <Button className="rounded-full bg-black/50 text-yellow-400 duration-400">
                {item}
              </Button>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ShowCategories;
