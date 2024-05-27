import Image from "next/image";
import { useState } from "react";
import { generateImage } from "./actions";
import { Generator } from "@/components/generator";

export default function Home() {
  
  return (
    <div className=" items-center justify-center h-screen gap-8">
        
        <Generator/>
    </div>
  );
}
